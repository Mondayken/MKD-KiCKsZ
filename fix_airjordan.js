const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const ajProducts = products.filter(p => p.category === 'Air Jordan');

const cards = ajProducts.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}">
      <div class="small">SKU: ${p.sku}</div>
      <h3>${p.name}</h3>
      <div class="price">${p.display_price}</div>
      <select id="size-${p.id}" class="size-select">
        <option value="5">5</option><option value="5.5">5.5</option><option value="6">6</option><option value="6.5">6.5</option><option value="7">7</option><option value="7.5">7.5</option><option value="8">8</option><option value="8.5">8.5</option><option value="9">9</option><option value="9.5">9.5</option><option value="10">10</option><option value="10.5">10.5</option><option value="11">11</option><option value="11.5">11.5</option><option value="12">12</option><option value="12.5">12.5</option><option value="13">13</option><option value="13.5">13.5</option><option value="14">14</option>
      </select>
      <button class="btn btn-primary" onclick="addToCart(${p.id}, document.getElementById('size-${p.id}').value)">Add to cart</button>
    </div>`).join('\n');

console.log(cards);
