const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

products.forEach(product => {
  product.price = 1;
  product.display_price = 'R 1.00';
});

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Prices updated to 1 ZAR');
