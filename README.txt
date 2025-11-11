1) Prepare files and images:
   - products.json: ensure SKUs match image filenames.
   - images/nike/<sku>.png and images/airjordan/<sku>.png

2) Push to GitHub:
   - git init; add files; commit; push to GitHub repo 'mkd-kicksz'

3) GitHub Pages:
   - Repo -> Settings -> Pages -> Deploy from branch 'main' / root
   - Site becomes https://<username>.github.io/mkd-kicksz/

4) Netlify (mirror + serverless):
   - Connect site to same GitHub repo (Netlify -> Sites -> New site -> Import from Git)
   - In Netlify > Site settings > Build & deploy > Environment variables:
       SENDGRID_API_KEY = <your sendgrid key>
       NOTIFY_EMAIL = <your business email>
       MKD_SECRET = <random secret, e.g., mkd_secret_123>
       STRIPE_PUBLISHABLE_KEY = <your stripe publishable key>
       STRIPE_SECRET_KEY = <your stripe secret key>
       PAYFAST_MERCHANT_ID = <your payfast merchant id>
       PAYFAST_MERCHANT_KEY = <your payfast merchant key>
   - Netlify will deploy. Serverless functions live under /.netlify/functions/orders

5) Payment Integrations:
   - PayPal: Checkout uses your PayPal client-id pre-inserted. To test: use PayPal Sandbox client-id in checkout.html if using sandbox.
   - Payfast: Merchant ID and Key are hardcoded in checkout.html for Payfast integration. Funds go to the linked Payfast merchant account.

6) Notes:
   - If you don't want emails, you can skip SendGrid & no serverless is needed.
   - To change prices/edit products, update products.json and push to GitHub.
   - Ensure secure handling of API keys: never expose secret keys in client-side code.
   - Test payment integrations in sandbox/test modes before going live.
