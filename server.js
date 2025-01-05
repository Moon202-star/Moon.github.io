const express = require('express');
const app = express();
const port = 3000;

// Webhook URL'sini burada saklıyoruz
const webhookUrl = 'https://discord.com/api/webhooks/1294398707999051797/URvT3b6ixl9S9Qk6qlfdzgSN1QqEKhRKE0I79eOP0LGdVvwBPiPUTm1PDDt1Ia1_AvAr';

// Webhook URL'ini frontend'e gönderen bir route
app.get('/webhook-url', (req, res) => {
    res.json({ webhookUrl });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
