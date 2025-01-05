import { initTheme } from './theme.js';
import { initAuth } from './auth.js';
import { initPayment } from './payment.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initPayment();
});