// Environment configuration - Move to .env file
const CONFIG = {
    PACKAGES: {
        basic: { name: 'Basic Package', price: 9.99, color: '#4f46e5' },
        premium: { name: 'Premium Package', price: 19.99, color: '#4f46e5' },
        ultimate: { name: 'Ultimate Package', price: 29.99, color: '#4f46e5' }
    },
    CARD_TYPES: {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6/
    }
};

// Encryption utility using AES
const cryptoUtils = {
    generateKey: () => {
        return window.crypto.getRandomValues(new Uint8Array(32));
    },

    async encrypt(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(data));

        const key = await window.crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt']
        );

        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            dataBuffer
        );

        const exportedKey = await window.crypto.subtle.exportKey('raw', key);

        return {
            encrypted: Array.from(new Uint8Array(encrypted)),
            iv: Array.from(iv),
            key: Array.from(new Uint8Array(exportedKey))
        };
    }
};

// Utility functions
const utils = {
    formatCurrency: (amount) => `$${amount.toFixed(2)}`,

    formatCardNumber: (value) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{4})/g, '$1 ').trim();
    },

    formatExpiryDate: (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length > 2) {
            return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
        }
        return numbers;
    },

    detectCardType: (number) => {
        for (const [type, pattern] of Object.entries(CONFIG.CARD_TYPES)) {
            if (pattern.test(number)) return type;
        }
        return 'unknown';
    },

    validateExpiryDate: (value) => {
        if (!/^\d{2}\/\d{2}$/.test(value)) return false;
        const [month, year] = value.split('/').map(num => parseInt(num, 10));
        const now = new Date();
        const expiry = new Date(2000 + year, month - 1);
        return month >= 1 && month <= 12 && expiry > now;
    },

    validateCVV: (cvv) => /^\d{3,4}$/.test(cvv),

    showToast: (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }, 100);
    }
};

// Luhn algorithm for card validation
function validateCardNumber(number) {
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }

    return (sum % 10) === 0 && number.length >= 13 && number.length <= 19;
}

// Form handling
class PaymentForm {
    constructor() {
        this.form = document.getElementById('payment-form');
        this.package = new URLSearchParams(window.location.search).get('package');
        this.apiEndpoint = '/api/process-payment'; // Move payment processing to backend
        this.initializeForm();
        this.attachEventListeners();
    }

    initializeForm() {
        const packageInfo = CONFIG.PACKAGES[this.package];
        if (!packageInfo) {
            window.location.href = 'index.html';
            return;
        }

        const packageDetails = document.getElementById('package-details');
        packageDetails.innerHTML = `
            <div class="package-info">
                <h3>${packageInfo.name}</h3>
                <p class="price">${utils.formatCurrency(packageInfo.price)}<span>/month</span></p>
            </div>
        `;
    }

    attachEventListeners() {
        const cardInput = document.getElementById('card-number');
        cardInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\s/g, '');
            e.target.value = utils.formatCardNumber(value);
            const cardType = utils.detectCardType(value);
            this.updateCardTypeIndicator(cardType);
            this.validateField('card-number', value);
        });

        const expiryInput = document.getElementById('expiry');
        expiryInput.addEventListener('input', (e) => {
            e.target.value = utils.formatExpiryDate(e.target.value);
            this.validateField('expiry', e.target.value);
        });

        const cvvInput = document.getElementById('cvv');
        cvvInput.addEventListener('input', (e) => {
            this.validateField('cvv', e.target.value);
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    updateCardTypeIndicator(type) {
        const indicator = document.getElementById('card-type');
        if (indicator) {
            indicator.className = `card-type ${type}`;
            indicator.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        }
    }

    validateField(fieldName, value) {
        const field = document.getElementById(fieldName);
        const feedback = document.getElementById(`${fieldName}-feedback`);
        let isValid = false;

        switch (fieldName) {
            case 'card-number':
                isValid = validateCardNumber(value);
                this.updateFeedback(feedback, isValid, 'Valid card number', 'Invalid card number');
                break;
            case 'expiry':
                isValid = utils.validateExpiryDate(value);
                this.updateFeedback(feedback, isValid, 'Valid expiry date', 'Invalid expiry date');
                break;
            case 'cvv':
                isValid = utils.validateCVV(value);
                this.updateFeedback(feedback, isValid, 'Valid CVV', 'Invalid CVV');
                break;
        }

        field.classList.toggle('valid', isValid);
        field.classList.toggle('invalid', !isValid && value.length > 0);
        this.updateSubmitButton();
    }

    updateFeedback(element, isValid, validMessage, invalidMessage) {
        if (element) {
            element.textContent = isValid ? validMessage : invalidMessage;
            element.className = `validation-message ${isValid ? 'valid' : 'invalid'}`;
        }
    }

    updateSubmitButton() {
        const submitButton = document.getElementById('submit-payment');
        const isFormValid = Array.from(this.form.elements)
            .every(element => !element.classList.contains('invalid') && element.value.length > 0);
        submitButton.disabled = !isFormValid;
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
            amount: CONFIG.PACKAGES[this.package].price,
            timestamp: new Date().toISOString()
        };

        try {
            // Encrypt sensitive data before sending
            const encryptedData = await cryptoUtils.encrypt(formData);
            const response = await this.sendPayment(encryptedData);

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

    async sendPayment(encryptedData) {
        const requestData = {
            data: encryptedData.encrypted,
            iv: encryptedData.iv,
            key: encryptedData.key
        };

        return fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-ID': crypto.randomUUID(), // Add request ID for tracking
                'X-Timestamp': new Date().toISOString()
            },
            body: JSON.stringify(requestData)
        });
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new PaymentForm());