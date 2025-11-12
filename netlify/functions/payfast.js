const crypto = require('crypto');

// Builds a Payfast redirect URL server-side to avoid exposing merchant_key in client HTML.
// Accepts JSON POST: { items, total, returnUrl, cancelUrl, notifyUrl, customer }
// Requires environment variables: PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY
// Optional: PAYFAST_SANDBOX = 'true' to use sandbox endpoint.

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  let payload;
  try { payload = JSON.parse(event.body || '{}'); } catch (e) { return { statusCode: 400, body: 'Bad payload' }; }

  const merchantId = process.env.PAYFAST_MERCHANT_ID;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
  const sandbox = (process.env.PAYFAST_SANDBOX || 'false').toLowerCase() === 'true';

  if (!merchantId || !merchantKey) return { statusCode: 500, body: 'Payfast not configured' };

  const endpoint = sandbox ? 'https://sandbox.payfast.co.za/eng/process' : 'https://www.payfast.co.za/eng/process';

  const total = Number(payload.total || 0) || 0;
  const returnUrl = payload.returnUrl || '';
  const cancelUrl = payload.cancelUrl || '';
  const notifyUrl = payload.notifyUrl || '';
  const itemName = payload.item_name || 'MKD K!CKsZ Order';

  // Build query params (Payfast accepts merchant_key in query string; we'll include it server-side)
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

  // Build URL-encoded query string
  const qs = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
  const url = endpoint + '?' + qs;

  // Log the constructed redirect (netlify function logs visible in dashboard)
  const remoteIp = event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'] || 'unknown';
  console.log('Built Payfast redirect for', remoteIp, 'sandbox=', sandbox, 'amount=', params.amount);

  return {
    statusCode: 200,
    body: JSON.stringify({ url })
  };
};
