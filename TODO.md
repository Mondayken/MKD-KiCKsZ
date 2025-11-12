# Domain Change to Free Subdomain (No-IP)

## Pending Tasks
- [ ] Register a free hostname on No-IP (e.g., mkdkicksz.ddns.net)
- [ ] Add the domain to Netlify site settings as a custom domain
- [ ] Configure DNS on No-IP: Set CNAME record pointing to your Netlify site (e.g., mkd-kicksz.netlify.app)
- [ ] Verify the site loads on the new domain
- [x] Update README.txt with new domain info
- [ ] Test payment integrations (Payfast uses dynamic origin, so should work)

## Additional Fixes
- [x] Fixed addToCart IDs in nike.html to match products.json IDs
- [x] Fixed addToCart IDs in airjordan.html to match products.json IDs
- [x] Implemented size selection for cart items (cart now stores product ID and size as key)
- [x] Embedded products data directly in app.js to avoid fetch issues

## Current Task: Fix Air Jordan addToCart IDs
- [ ] Extract Air Jordan products from products.json (IDs 23-51)
- [ ] Generate new HTML cards for the grid using products.json details
- [ ] Replace the existing <div class="grid"> content in airjordan.html with the new cards
- [ ] Test adding products to cart to verify correct product is added
