#!/bin/bash
# Script to move static site files to public/ folder for Vercel deployment

mkdir -p public

# Move HTML files
mv index.html brand_nike.html brand_aj.html nike.html airjordan.html cart.html checkout.html contact.html ./public/ 2>/dev/null

# Move CSS files
mv styles.css ./public/ 2>/dev/null

# Move JS files (excluding serverless function scripts inside api/)
mv app.js generate_airjordan_html.js updateHTMLPrices.js updatePrices.js ./public/ 2>/dev/null

# Move images directory
mv images ./public/ 2>/dev/null

# Move products.json as data file if used by frontend
mv products.json ./public/ 2>/dev/null

echo "Static files moved to public/ folder. Please commit the changes and redeploy."
