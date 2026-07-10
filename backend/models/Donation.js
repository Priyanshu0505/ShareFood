const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    expiryTime: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed'], // 🌟 'completed' status add kiya
        default: 'pending'
    },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    image: { type: String, default: null },
    // 🌟 OTP Authentication Columns
    pickupOTP: { type: String, default: null } 
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);