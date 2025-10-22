const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const paymentData = {
        bookingId: document.getElementById('bookingId').value,
        amount: document.getElementById('amount').value,
        method: document.getElementById('method').value
    };

    // payment.js
const res = await fetch('http://localhost:5004/api/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
});


    const data = await res.json();
    alert('Payment Successful! Payment ID: ' + data._id);
    paymentForm.reset();
});