< !DOCTYPE html >
    <html lang="en">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Complete Purchase - Moon Client</title>
                    <link rel="stylesheet" href="styles.css">
                        <style>
        /* Önceki stiller aynen kalıyor */

                            /* 3D Secure ve Güvenlik Göstergeleri için yeni stiller */
                            .security-badges {
                                display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 1.5rem;
                            margin-top: 2rem;
                            padding: 1rem;
                            background: var(--bg-light);
                            border: 1px solid var(--border-light);
                            border-radius: 8px;
        }

                            .security-badge {
                                display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            color: var(--text-secondary);
                            font-size: 0.875rem;
        }

                            .security-badge img {
                                height: 24px;
                            object-fit: contain;
        }

                            .card-icons {
                                display: flex;
                            gap: 1rem;
                            margin-bottom: 1rem;
        }

                            .card-icons img {
                                height: 24px;
                            opacity: 0.7;
                            transition: opacity 0.2s;
        }

                            .card-icons img:hover {
                                opacity: 1;
        }

                            .secure-badge {
                                display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            color: var(--success-color);
                            font-size: 0.875rem;
                            margin-bottom: 1rem;
        }

                            .secure-badge svg {
                                width: 16px;
                            height: 16px;
        }

                            .payment-info {
                                margin - top: 1rem;
                            padding: 1rem;
                            background: rgba(34, 197, 94, 0.1);
                            border-radius: 6px;
                            color: var(--text-secondary);
                            font-size: 0.875rem;
                            line-height: 1.5;
        }

                            .payment-info svg {
                                width: 16px;
                            height: 16px;
                            margin-right: 0.5rem;
                            vertical-align: middle;
        }
                        </style>
                    </head>
                    <body>
                        <div class="payment-container">
                            <!-- Önceki header kısmı aynen kalıyor -->

                            <div class="order-summary">
                                <h2>Order Summary</h2>
                                <div id="package-details" class="package-details">
                                    <!-- Package details will be inserted by JavaScript -->
                                </div>
                            </div>

                            <form id="payment-form" class="payment-form">
                                <div class="secure-badge">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    Secure Payment
                                </div>

                                <div class="card-icons">
                                    <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/visa.svg" alt="Visa">
                                        <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/mastercard.svg" alt="Mastercard">
                                            <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/amex.svg" alt="American Express">
                                            </div>

                                            <!-- Form grupları aynen kalıyor -->
                                            <div class="form-group">
                                                <label for="card-name">Cardholder Name</label>
                                                <input type="text" id="card-name" required placeholder="John Doe">
                                            </div>

                                            <div class="form-group">
                                                <label for="card-number">Card Number</label>
                                                <input type="text" id="card-number" required placeholder="1234 5678 9012 3456" maxlength="19">
                                                    <div id="card-number-feedback" class="validation-message"></div>
                                            </div>

                                            <div class="form-row">
                                                <div class="form-group">
                                                    <label for="expiry">Expiry Date</label>
                                                    <input type="text" id="expiry" required placeholder="MM/YY" maxlength="5">
                                                        <div id="expiry-feedback" class="validation-message"></div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="cvv">CVV</label>
                                                    <input type="password" id="cvv" required placeholder="123" maxlength="4">
                                                        <div id="cvv-feedback" class="validation-message"></div>
                                                </div>
                                            </div>

                                            <div class="payment-info">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 16v-4" />
                                                    <path d="M12 8h.01" />
                                                </svg>
                                                Your payment is protected by 3D Secure authentication. After clicking "Complete Purchase", you may be redirected to your bank's verification page.
                                            </div>

                                            <button type="submit" id="submit-payment" class="submit-button" disabled>Complete Purchase</button>

                                            <div class="security-badges">
                                                <div class="security-badge">
                                                    <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/visa-verified.svg" alt="Verified by Visa">
                                                </div>
                                                <div class="security-badge">
                                                    <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/mastercard-securecode.svg" alt="Mastercard SecureCode">
                                                </div>
                                                <div class="security-badge">
                                                    <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/ssl.svg" alt="SSL Secure">
                                                </div>
                                            </div>
                                        </form>
                                </div>

                                <script src="payment.js"></script>
                            </body>
                        </html>