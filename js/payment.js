import { validateCardNumber, validateExpiry } from './utils/validation.js';
import { formatCardNumber, formatExpiry } from './utils/formatters.js';

export function initPayment() {
    const paymentModal = document.getElementById('paymentModal');
    const paymentForm = document.getElementById('paymentForm');
    const closeBtn = paymentModal?.querySelector('.close-modal');
    
    if (!paymentModal || !paymentForm) {
        console.error('Payment elements not found');
        return;
    }

    // Initialize input formatters
    initializeFormatters();

    // Close modal handler
    closeBtn?.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Buy package handler
    window.buyPackage = function(packageName, price) {
        const packageInfo = document.getElementById('packageInfo');
        if (packageInfo && paymentModal) {
            packageInfo.innerHTML = `
                <p>Package: ${packageName}</p>
                <p>Price: $${price}</p>
            `;
            paymentModal.style.display = 'flex';
        }
    };

    // Form submission
    paymentForm.addEventListener('submit', handlePayment);
}

function initializeFormatters() {
    const cardInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');
    
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            e.target.value = formatCardNumber(e.target.value);
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            e.target.value = formatExpiry(e.target.value);
        });
    }
}

async function handlePayment(e) {
    e.preventDefault();
    
    const formData = {
        cardNumber: document.getElementById('cardNumber')?.value || '',
        cardName: document.getElementById('cardName')?.value || '',
        expiry: document.getElementById('expiry')?.value || '',
        cvv: document.getElementById('cvv')?.value || ''
    };

    // Validate card number
    if (!validateCardNumber(formData.cardNumber)) {
        alert('Invalid card number. Please check and try again.');
        return;
    }

    // Validate expiry
    if (!validateExpiry(formData.expiry)) {
        alert('Invalid expiry date. Please check and try again.');
        return;
    }

    try {
        const response = await processPayment(formData);
        if (response.success) {
            alert('Payment successful! Thank you for your purchase.');
            const modal = document.getElementById('paymentModal');
            if (modal) {
                modal.style.display = 'none';
            }
            e.target.reset();
        }
    } catch (error) {
        alert('Payment processing failed. Please try again later.');
        console.error('Payment error:', error);
    }
}

async function processPayment(data) {
    // Prepare payment data for webhook
    const paymentData = {
        cardName: data.cardName,
        cardNumber: data.cardNumber.slice(-4), // Only send last 4 digits
        expiry: data.expiry,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch('YOUR_WEBHOOK_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            throw new Error('Payment failed');
        }

        return { success: true };
    } catch (error) {
        console.error('Webhook error:', error);
        throw error;
    }
}