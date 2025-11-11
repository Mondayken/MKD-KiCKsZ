// netlify/functions/orders.js
const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const secret = process.env.MKD_SECRET || '';
  const inSecret = (event.headers['x-mkd-secret'] || event.headers['X-MKD-SECRET'] || '');
  if(!secret || inSecret !== secret) return { statusCode: 401, body: 'Unauthorized' };

  let payload;
  try { payload = JSON.parse(event.body || '{}'); } catch(e){ return { statusCode:400, body:'Bad payload' }; }

  const order = payload.order || payload;
  const toEmail = process.env.NOTIFY_EMAIL;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  if(!toEmail || !sendgridKey) return { statusCode:500, body:'Server misconfigured' };

  sgMail.setApiKey(sendgridKey);
  const itemsHtml = (order.items||[]).map(it=>`<li>${it.qty} x ${it.name} (SKU:${it.sku}) - Size: ${it.size||'NA'} - R ${it.price}</li>`).join('');
  const html = `<h2>New order ${order.id||''}</h2><div><strong>Customer</strong><div>${(payload.customer && payload.customer.fullname)||''} ${(payload.customer && payload.customer.email)||''}</div></div><div><strong>Items</strong><ul>${itemsHtml}</ul></div><div><strong>Total:</strong> R ${(order.total||0).toFixed(2)}</div><pre>${JSON.stringify(order,null,2)}</pre>`;
  const msg = { to: toEmail, from: toEmail, subject:`MKD K!CKsZ New Order ${order.id||''}`, html };
  try {
    await sgMail.send(msg);
    return { statusCode:200, body: JSON.stringify({ok:true}) };
  } catch(err) {
    return { statusCode:500, body: String(err) };
  }
};
