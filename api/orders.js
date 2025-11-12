// api/orders.js
const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const secret = process.env.MKD_SECRET || '';
  const inSecret = req.headers['x-mkd-secret'] || '';
  if (!secret || inSecret !== secret) return res.status(401).end('Unauthorized');

  const payload = req.body;
  const order = payload.order || payload;
  const toEmail = process.env.NOTIFY_EMAIL;
  if (!toEmail) return res.status(500).send('NOTIFY_EMAIL missing');

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (!sendgridKey) return res.status(500).send('SENDGRID_API_KEY missing');

  sgMail.setApiKey(sendgridKey);
  const orderHtml = `<h2>New order: ${order.id || ''}</h2> ...`; // same structure as Netlify version
  const msg = {
    to: toEmail,
    from: toEmail,
    subject: `MKD K!CKsZ - New Order ${order.id || ''}`,
    html: orderHtml
  };
  try {
    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send(String(err));
  }
}
