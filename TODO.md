# TODO - Capitec Pay Integration and Checkout Updates

## Research
- Research Capitec Pay integration options, official docs, APIs, and best practices for ecommerce websites.

## Frontend Changes
- Remove PayPal payment option from checkout page.
- Add Capitec Pay payment option UI (radio button, payment button) alongside PayFast.

## Backend Changes
- Create new serverless API endpoint (api/capitecpay.js) to initiate Capitec Pay payment session and generate redirect URL or payment token.
- Use environment variables for Capitec Pay API credentials.
- Implement basic stub for Capitec Pay backend to allow testing if real credentials/API not provided.

## Testing
- Test checkout flow end-to-end with PayFast and Capitec Pay options.
- Verify form validation, payment redirect, and order confirmation.
- Test backend API endpoints handling payments and webhooks.

## Documentation & Summary
- Provide summary and comparison of Capitec Pay, PayFast, and PayPal payment options.
- Document setup instructions for environment variables and payment providers.

## Next Steps
- Begin with Capitec Pay research and confirm approach.
- Update frontend checkout page UI.
- Implement backend stub and API.
- Deploy and test incremental changes.
