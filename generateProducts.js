// generateProducts.js
const fs = require('fs');
const path = require('path');

const BASE_PATH = './images';
const DEFAULT_PRICE = 1000.0;
const OUTPUT_FILE = './products.json';

// Utility: builds product objects from image files
function getFilesRecursive(dir, category) {
  return fs.readdirSync(dir)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .map((file, index) => {
      const name = path.parse(file).name;
      const formattedName =
        category === 'Nike'
          ? `Nike ${name.replace(/TN-|AF1/i, '').toUpperCase()}`
          : `Air Jordan ${name.replace(/AJ4-/i, '')}`;

      return {
        id: Date.now() + index,
        sku: name,
        name: formattedName.trim(),
        price: DEFAULT_PRICE,
        currency: 'ZAR',
        display_price: 'R 1000.00',
        category,
        image: `${dir.replace('./', '')}/${file}`,
        description: ''
      };
    });
}

// Generate separate product groups
const airJordanProducts = getFilesRecursive(path.join(BASE_PATH, 'airjordan'), 'Air Jordan');
const nikeProducts = getFilesRecursive(path.join(BASE_PATH, 'nike'), 'Nike');

// Combine into one grouped object
const groupedProducts = {
  "Air Jordan": airJordanProducts,
  "Nike": nikeProducts
};

// Write to products.json
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(groupedProducts, null, 2));
console.log(`✅ Generated products.json with ${airJordanProducts.length} Air Jordan and ${nikeProducts.length} Nike items.`);
