// Luhn Algorithm implementation
function validateCardNumber(number) {
    let sum = 0;
    let isEven = false;
    
    // Remove any spaces or hyphens
    number = number.replace(/\D/g, '');
    
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Modal handling
const loginModal = document.getElementById('loginModal');
const paymentModal = document.getElementById('paymentModal');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});

// Handle package purchase
function buyPackage(packageName, price) {
    paymentModal.style.display = 'flex';
    document.getElementById('packageInfo').innerHTML = `
        <p>Package: ${packageName}</p>
        <p>Price: $${price}</p>
    `;
}

// Payment form handling
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Validate card number using Luhn algorithm
    if (!validateCardNumber(cardNumber)) {
        alert('Invalid card number. Please check and try again.');
        return;
    }
    
    // Prepare payment data for webhook
    const paymentData = {
        cardName,
        cardNumber: cardNumber.slice(-4), // Only send last 4 digits for security
        expiry,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send to webhook (replace URL with your actual webhook URL)
        const response = await fetch('YOUR_WEBHOOK_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData)
        });
        
        if (response.ok) {
            alert('Payment successful! Thank you for your purchase.');
            paymentModal.style.display = 'none';
            paymentForm.reset();
        } else {
            throw new Error('Payment failed');
        }
    } catch (error) {
        alert('Payment processing failed. Please try again later.');
        console.error('Payment error:', error);
    }
});

// Format card expiry date
const expiryInput = document.getElementById('expiry');
expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Format card number with spaces
const cardNumberInput = document.getElementById('cardNumber');
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});