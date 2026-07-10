const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tickets', require('./routes/ticket'));

// Static Route for Uploaded Images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sharefood';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected Successfully... ✅'))
    .catch(err => console.error('MongoDB Connection Error ❌:', err));

// Standard App Routes Routing
app.use('/api/auth', require('./routes/auth'));
app.use('/api/donations', require('./routes/donation'));

// Server Port Tuning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT} 🚀`);
});