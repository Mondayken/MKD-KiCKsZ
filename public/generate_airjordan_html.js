const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Filter Air Jordan products
const airJordanProducts = products.filter(product => product.category === 'Air Jordan');

// Generate HTML for each product
const generateProductCards = (products) => {
  return products.map(product => {
    const sizeOptions = Array.from({length: 19}, (_, i) => {
      const size = 5 + i * 0.5;
      return `<option value="${size}">${size}</option>`;
    }).join('');

    return `
    <div class="card">
      <img src="${product.image.replace(/\\/g, '/')}" alt="${product.name}">
      <div class="small">SKU: ${product.sku}</div>
      <h3>${product.name}</h3>
      <div class="price">R ${product.price}.00</div>
      <select id="size-${product.id}" class="size-select">
        ${sizeOptions}
      </select>
      <button class="btn btn-primary" onclick="addToCart(${product.id}, document.getElementById('size-${product.id}').value)">Add to cart</button>
    </div>`;
  }).join('');
};

// Read the template
const template = fs.readFileSync('airjordan.html', 'utf8');

// Find the grid section and replace it
const gridStart = template.indexOf('<div class="grid">');
const gridEnd = template.indexOf('</div>\n</main>') + 6;
const beforeGrid = template.substring(0, gridStart + '<div class="grid">'.length);
const afterGrid = template.substring(gridEnd);

const newGridContent = generateProductCards(airJordanProducts);

const newHTML = beforeGrid + '\n' + newGridContent + '\n  ' + afterGrid;

// Write the new HTML
fs.writeFileSync('airjordan.html', newHTML);

console.log('Air Jordan HTML generated successfully.');
