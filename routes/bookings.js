const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Correct model name

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    const { name, email, destination, date, seats } = req.body;

    const newBooking = new Booking({
        name,
        email,
        destination,
        date,
        seats
    });

    try {
        const savedBooking = await newBooking.save();
        // Return a message and bookingId for frontend
        res.status(201).json({
            message: "Booking Successful!",
            bookingId: savedBooking._id
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/bookings - List all bookings (optional)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
