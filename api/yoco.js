/**
 * Skeleton backend API endpoint for Yoco payment processing.
 * This file should be placed in the /api folder and called via POST /api/yoco.
 * 
 * Expected payload (JSON):
 * {
 *   token: string,               // Yoco token from client
 *   amount: number,              // Total amount to charge (in ZAR)
 *   currency: string,            // Currency code, e.g., 'ZAR'
 *   items: Array,                // Array of cart items [{ sku, pk, name, qty, price, size }]
 *   customer: {                  // Customer info
 *     fullname: string,
 *     email: string,
 *     address: string,
 *     city: string,
 *     postal: string
 *   }
 * }
 * 
 * Replace 'YOUR_YOCO_SECRET_KEY' with your actual Yoco secret key.
 */

const fetch = require('node-fetch');

const YOUR_YOCO_SECRET_KEY = 'YOUR_YOCO_SECRET_KEY_HERE'; // Replace with actual secret key

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const payload = req.body;

  if (!payload || !payload.token || !payload.amount) {
    res.status(400).json({ error: 'Missing required payment fields.' });
    return;
  }

  try {
    // Construct Yoco payment charge request
    const chargePayload = {
      token: payload.token,
      amountInCents: Math.round(payload.amount * 100),  // Yoco expects amount in cents
      currency: payload.currency || 'ZAR',
      /* Optional additional metadata, e.g.:
      metadata: {
        customer_name: payload.customer.fullname || '',
        customer_email: payload.customer.email || '',
      }
      */
    };

    // Make request to Yoco Charge API
    const response = await fetch('https://online.yoco.com/v1/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Secret-Key': YOUR_YOCO_SECRET_KEY
      },
      body: JSON.stringify(chargePayload)
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(502).json({
        error: data.message || 'Failed to process Yoco payment.',
        details: data
      });
      return;
    }

    // On success, send transaction id or relevant details back
    res.status(200).json({
      transactionId: data.id,
      status: data.status,
      message: 'Payment processed successfully.'
    });
  } catch (error) {
    console.error('Yoco payment processing error:', error);
    res.status(500).json({ error: 'Internal server error during payment processing.' });
  }
};
