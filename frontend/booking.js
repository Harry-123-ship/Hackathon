const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookingData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value,
        seats: document.getElementById('seats').value
    };

    try {
        const res = await fetch('http://localhost:5004/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        // Make sure the backend sends bookingId
        if (data.bookingId) {
            alert(`Booking Successful! Your Booking ID: ${data.bookingId}`);
        } else {
            alert('Booking successful, but no Booking ID returned.');
        }
    } catch (error) {
        console.error(error);
        alert('Booking failed. Please try again.');
    }
});
