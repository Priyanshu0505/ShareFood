const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB max
});

// 1. CREATE DONATION (Donor Only)
router.post('/create', auth, upload.single('image'), async (req, res) => {
    if (req.user.role !== 'donor') return res.status(403).json({ msg: 'Only donors can post food' });

    const { foodType, quantity, expiryTime, pickupAddress, contactNumber } = req.body;
    try {
        const newDonation = new Donation({
            donor: req.user.id,
            foodType, 
            quantity, 
            expiryTime, 
            pickupAddress, 
            contactNumber,
            image: req.file ? `uploads/${req.file.filename}` : null
        });
        await newDonation.save();
        res.status(201).json(newDonation);
    } catch (err) {
        console.error("Donation Creation Error ❌:", err);
        res.status(500).send('Server Error');
    }
});

// 2. GET ALL PENDING DONATIONS (NGO Dashboard / Find Food Page)
router.get('/pending', auth, async (req, res) => {
    try {
        const donations = await Donation.find({ status: 'pending' })
            .populate('donor', 'name email')
            .select('foodType quantity expiryTime pickupAddress contactNumber image status createdAt');
        res.json(donations);
    } catch (err) {
        console.error("Fetch Pending Donations Error ❌:", err);
        res.status(500).send('Server Error');
    }
});

// 3. ACCEPT DONATION (NGO Only)
router.put('/accept/:id', auth, async (req, res) => {
    if (req.user.role !== 'ngo') return res.status(403).json({ msg: 'Only NGOs can accept food' });

    try {
        let donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });
        if (donation.status === 'accepted') return res.status(400).json({ msg: 'Already accepted' });

        donation.status = 'accepted';
        donation.acceptedBy = req.user.id;
        await donation.save();

        res.json({ msg: 'Donation accepted successfully', donation });
    } catch (err) {
        console.error("Accept Donation Error ❌:", err);
        res.status(500).send('Server Error');
    }
});

// 4. GET LOGGED-IN DONOR'S HISTORY (Donor Status Tracker Panel)
router.get('/my-donations', auth, async (req, res) => {
    if (req.user.role !== 'donor') return res.status(403).json({ msg: 'Only donors can see their history' });

    try {
        const history = await Donation.find({ donor: req.user.id })
            .populate('acceptedBy', 'name email contact phone phoneNumber contactNumber') 
            .sort({ createdAt: -1 }); 
        res.json(history);
    } catch (err) {
        console.error("Fetch Donor History Error ❌:", err);
        res.status(500).send('Server Error');
    }
});

// 5. GET LOGGED-IN NGO'S ACCEPTED HISTORY (Your Accepted & Claimed Food Logs)
router.get('/my-accepted', auth, async (req, res) => {
    if (req.user.role !== 'ngo') return res.status(403).json({ msg: 'Only NGOs can see their claims' });

    try {
        const history = await Donation.find({ acceptedBy: req.user.id, status: 'accepted' })
            .populate('donor', 'name email')
            .sort({ updatedAt: -1 });
        res.json(history);
    } catch (err) {
        console.error("Fetch NGO History Error ❌:", err);
        res.status(500).send('Server Error');
    }
});

// 🌟 6. GENERATE OTP (Donor Side)
router.put('/generate-otp/:id', auth, async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });
        if (donation.donor.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized action' });

        // Generate a random 4-digit OTP code
        const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
        donation.pickupOTP = generatedOTP;
        await donation.save();

        res.json({ msg: 'OTP Generated successfully', otp: generatedOTP });
    } catch (err) {
        console.error("OTP Gen Error:", err);
        res.status(500).send('Server Error');
    }
});

// 🌟 7. VERIFY OTP & COMPLETE PICKUP (NGO Side)
router.put('/verify-otp/:id', auth, async (req, res) => {
    const { otp } = req.body;
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });
        if (donation.status !== 'accepted') return res.status(400).json({ msg: 'Donation not accepted yet' });

        // Check if OTP matches
        if (donation.pickupOTP !== otp) {
            return res.status(400).json({ msg: 'Invalid Verification OTP! Please check with donor.' });
        }

        // Complete the order pipeline
        donation.status = 'completed';
        donation.pickupOTP = null; // Clear OTP after success
        await donation.save();

        res.json({ msg: 'Food Pickup Authenticated & Completed Successfully! 🎉', donation });
    } catch (err) {
        console.error("OTP Verify Error:", err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;