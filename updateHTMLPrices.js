const fs = require('fs');
const path = require('path');

// Load products.json
const productsPath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Create a map of product IDs to prices
const priceMap = {};
products.forEach(p => {
  priceMap[p.id] = p.display_price;
});

// Function to update prices in HTML content
function updatePricesInHTML(htmlContent) {
  // Match patterns like <div class="price">R 1.00</div>
  return htmlContent.replace(/<div class="price">R \d+\.\d{2}<\/div>/g, (match, offset, string) => {
    // Find the product ID from nearby addToCart call or size select
    const before = string.substring(0, offset);
    const after = string.substring(offset + match.length);

    // Look for addToCart(id, ...) in the vicinity
    const addToCartMatch = before.match(/addToCart\((\d+),/) || after.match(/addToCart\((\d+),/);
    if (addToCartMatch) {
      const id = parseInt(addToCartMatch[1]);
      const newPrice = priceMap[id];
      if (newPrice) {
        return `<div class="price">${newPrice}</div>`;
      }
    }

    // Fallback: keep original if no ID found
    return match;
  });
}

// Update all HTML files
const htmlFiles = ['index.html', 'nike.html', 'airjordan.html', 'brand_nike.html', 'brand_aj.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = updatePricesInHTML(content);
    fs.writeFileSync(filePath, content);
    console.log(`Updated prices in ${file}`);
  }
});

console.log('All HTML files updated with new prices.');
