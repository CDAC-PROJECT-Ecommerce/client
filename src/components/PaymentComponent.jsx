import React from 'react';

function PaymentComponent() {
    const handlePayment = async () => {
        const response = await fetch('http://localhost:8080/create-order', {
            method: 'POST',
        });
        const order = await response.json();

        const options = {
            key: 'rzp_test_l7Q7HVqRLk6SQW',
            amount: order.amount,
            currency: 'INR',
            name: 'My eCommerce Site',
            description: 'Test Transaction',
            order_id: order.id,
            handler: function (response) {
                alert('Payment Successful!');
                console.log(response);
            },
            prefill: {
                name: 'Test User',
                email: 'test@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return <button onClick={handlePayment}>Pay Now</button>;
}

export default PaymentComponent;