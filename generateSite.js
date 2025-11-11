/**
 * generateSite.js
 * Automatically builds products.json + brand pages (Nike, Air Jordan).
 * Supports auto SKU creation, default price, and size selector in UI.
 */

const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "images");
const outputJson = path.join(__dirname, "products.json");
const nikeHtml = path.join(__dirname, "brand_nike.html");
const ajHtml = path.join(__dirname, "brand_aj.html");

const categories = ["nike", "airjordan"];
const price = 1000.0;

// Utility helpers
function generateSKU(prefix, index) {
  const num = String(index).padStart(3, "0");
  return prefix.toUpperCase() + num;
}

function getDisplayName(filename) {
  const base = path.parse(filename).name;
  const clean = base.replace(/[_-]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  return clean;
}

function buildHTMLPage(title, products, category) {
  const productCards = products
    .map(
      (p) => `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div>${p.display_price}</div>
        <label>Size:</label>
        <select id="size-${p.id}">
          ${["5","6","7","8","9","10","11","12"].map(s=>`<option value="${s}">${s}</option>`).join("")}
        </select>
        <button class="btn btn-primary" onclick="addToCart(${p.id}, document.getElementById('size-${p.id}').value)">Add to cart</button>
      </div>`
    )
    .join("\n");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="logo">MKD K!CKsZ</div>
    <nav>
      <a href="index.html">Home</a> | <a href="cart.html">Cart</a>
    </nav>
  </header>
  <main class="container">
    <h2>${category}</h2>
    <div class="grid">${productCards}</div>
  </main>
  <script src="app.js"></script>
</body>
</html>`;
}

async function main() {
  let products = [];
  let id = 1;

  for (const cat of categories) {
    const folder = path.join(baseDir, cat);
    if (!fs.existsSync(folder)) continue;

    const files = fs.readdirSync(folder).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    for (const file of files) {
      const sku = generateSKU(cat === "nike" ? "FC" : "MD", id);
      const name = getDisplayName(file);
      const image = `images/${cat}/${file}`;

      products.push({
        id: id++,
        sku,
        name,
        price,
        currency: "ZAR",
        display_price: "R " + price.toFixed(2),
        category: cat === "nike" ? "Nike" : "Air Jordan",
        image,
        description: "",
      });
    }
  }

  // Save JSON
  fs.writeFileSync(outputJson, JSON.stringify(products, null, 2));
  console.log(`✅ Generated ${products.length} products in products.json`);

  // Generate brand pages
  const nikeProducts = products.filter((p) => p.category === "Nike");
  const ajProducts = products.filter((p) => p.category === "Air Jordan");

  fs.writeFileSync(nikeHtml, buildHTMLPage("Nike", nikeProducts, "Nike"));
  fs.writeFileSync(ajHtml, buildHTMLPage("Air Jordan", ajProducts, "Air Jordan"));

  console.log("✅ Brand pages updated: brand_nike.html, brand_aj.html");
}

main();
