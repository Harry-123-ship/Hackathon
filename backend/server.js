// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 54442; // change if needed

// middlewares
app.use(cors()); // allow frontend requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple in-memory bookings store (for demo)
const bookings = [];

// booking route
app.post('/api/book', (req, res) => {
  console.log('Incoming booking body:', req.body); // <-- place this in backend

  try {
    const { name, email, destination, seats, date } = req.body;
    console.log('Received date:', date); // helpful debug log

    // basic validation
    if (!name || !email || !destination || !date) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const booking = {
      id: (Math.floor(Math.random() * 900000) + 100000).toString(),
      name,
      email,
      destination,
      seats: Number(seats) || 1,
      date: new Date(date).toISOString()
    };

    bookings.push(booking);
    console.log('Saved booking:', booking);

    return res.json({ ok: true, bookingId: booking.id, booking });
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Optional: get bookings
app.get('/api/bookings', (req, res) => {
  res.json({ ok: true, bookings });
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
