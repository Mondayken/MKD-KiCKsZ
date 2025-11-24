const crypto = require('crypto');

// Vercel serverless function handler using CommonJS module.exports style
module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  let payload;
  try {
    // Parse body as JSON (Vercel parses JSON automatically if content-type is json)
    payload = req.body;
  } catch (e) {
    res.status(400).send('Bad payload');
    return;
  }

const merchantId = process.env.PAYFAST_MERCHANT_ID;
const merchantKey = process.env.PAYFAST_MERCHANT_KEY;

// Removed sandbox mode usage as this is for testing only:

if (!merchantId || !merchantKey) {
  res.status(500).send('Payfast not configured');
  return;
}

const endpoint = 'https://www.payfast.co.za/eng/process';

  const total = Number(payload.total || 0) || 0;
  const returnUrl = payload.returnUrl || '';
  const cancelUrl = payload.cancelUrl || '';
  const notifyUrl = payload.notifyUrl || '';
  const itemName = payload.item_name || 'MKD K!CKsZ Order';

  const params = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    amount: total.toFixed(2),
    item_name: itemName,
    email_address: (payload.customer && payload.customer.email) || ''
  };

  const qs = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
  const url = endpoint + '?' + qs;

  const remoteIp = req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'] || 'unknown';
  console.log('Built Payfast redirect for', remoteIp, 'sandbox=', sandbox, 'amount=', params.amount);

  res.status(200).json({ url });
};
