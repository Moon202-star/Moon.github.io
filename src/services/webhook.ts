export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export async function sendPaymentWebhook(data: PaymentData): Promise<Response> {
  const WEBHOOK_URL = 'YOUR_WEBHOOK_URL'; // Replace with your webhook URL
  
  return fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}