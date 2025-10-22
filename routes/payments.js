const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('bookingId');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { bookingId, amount, method } = req.body;
    const payment = new Payment({ bookingId, amount, method, status: 'Completed' });
    try {
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;