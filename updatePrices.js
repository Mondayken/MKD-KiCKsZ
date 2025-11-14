const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

products.forEach(product => {
  // Randomly assign price to 5 or 10 ZAR
  const randomPrice = Math.random() < 0.5 ? 5 : 10;
  product.price = randomPrice;
  product.display_price = `R ${randomPrice}.00`;
});

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Prices randomly updated to 5 or 10 ZAR');
