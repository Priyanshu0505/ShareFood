const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// POST: /api/tickets/submit
router.post('/submit', async (req, res) => {
    const { name, email, type, subject, message } = req.body;
    try {
        const newTicket = new Ticket({ name, email, type, subject, message });
        await newTicket.save();
        res.status(201).json({ msg: 'Ticket registered successfully', newTicket });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 🌟 GET: /api/tickets/all (Admin/Coordinator Complaint View)
router.get('/all', async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        console.error("Fetch tickets error:", err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;