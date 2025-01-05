async sendPayment(formData) {
    try {
        const response = await fetch('/send-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            utils.showToast('Payment successful! Redirecting...');
            setTimeout(() => window.location.href = 'index.html', 2000);
        } else {
            throw new Error('Payment failed');
        }
    } catch (error) {
        utils.showToast('Payment failed. Please try again.', 'error');
        console.error('Payment Error:', error);
    }
}
