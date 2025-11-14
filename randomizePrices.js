const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

products.forEach(p => {
  p.price = Math.random() < 0.5 ? 5 : 10;
  p.display_price = p.price === 5 ? '5 rand' : '10 rands';
});

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

console.log('Prices randomized successfully.');
