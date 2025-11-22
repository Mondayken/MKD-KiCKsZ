# TODO - Thorough Testing and Deployment on Vercel

## 1. Prepare for Deployment
- Install Vercel CLI globally: `npm install -g vercel`
- Deploy the project from the root folder using `vercel` command.
- Verify deployment completes successfully and obtain the live URL.

## 2. Thorough Testing of Deployed Website

### Static Pages Testing (HTML, CSS, JS, Images)
- Test all HTML pages including:
  - index.html
  - brand_nike.html
  - brand_aj.html
  - nike.html
  - cart.html
  - checkout.html
  - contact.html
  - airjordan.html
- Verify CSS (styles.css) and JS files load and function properly.
- Verify all images under images/ folder render correctly in their respective pages.
- Test navigation and user interactions on each page.

### API Endpoints Testing (Serverless Functions)
- Test every API endpoint in the api/ folder:
  - api/orders.js
  - api/payfast.js
- Validate expected responses for each endpoint.
- Test edge cases, error handling, and incorrect inputs.

### Other Functional Testing
- Test dynamic scripts like:
  - generate_airjordan_html.js
  - updateHTMLPrices.js
  - updatePrices.js
- Confirm their expected functionality or effect on the deployed site.

## 3. Report Issues and Fixes
- Document any bugs, loading errors, or performance problems during testing.
- Address issues with code updates and re-deploy as necessary.

---

Once this TODO is complete, deployment and testing will be finished.

Please confirm if you want me to proceed with generating the deployment guidance instructions and help with the testing steps.
