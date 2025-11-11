// --- Load product data globally ---
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    // Flatten the products object into an array
    window.__products = Object.values(data).flat();
    // Auto-render cart if we are on cart.html
    if (window.location.pathname.includes("cart.html")) {
      renderCart();
    }
  });

// --- Add to Cart function ---
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  cart[id] = (cart[id] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Added to cart!");
}

// --- Update Quantity function ---
function updateQuantity(id, delta) {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  if (cart[id]) {
    cart[id] += delta;
    if (cart[id] <= 0) {
      delete cart[id];
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// --- Remove from Cart function ---
function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// --- Clear Cart function ---
function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

// --- Submit Order to Server function ---
async function submitOrderToServer(data) {
  try {
    const response = await fetch('/.netlify/functions/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mkd-secret': 'your-secret-key' // Replace with actual secret or use env var
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit order');
    return await response.json();
  } catch (error) {
    console.error('Order submission error:', error);
    throw error;
  }
}

// --- Render Cart Items on cart.html ---
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const summaryContainer = document.getElementById("cart-summary");
  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const products = window.__products || [];

  if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty 😢</p>`;
    summaryContainer.innerHTML = "";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  for (const [id, qty] of Object.entries(cart)) {
    const p = products.find(x => x.id == id);
    if (!p) continue;
    const subtotal = p.price * qty;
    total += subtotal;

    cartContainer.innerHTML += `
      <div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
        <img src="${p.image}" alt="${p.name}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">
        <div style="flex:1;">
          <strong>${p.name}</strong><br>
          <span>Price: R ${p.price}</span><br>
          <span>Subtotal: R ${subtotal}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button onclick="updateQuantity(${id}, -1)" class="btn btn-secondary">-</button>
          <span>Qty: ${qty}</span>
          <button onclick="updateQuantity(${id}, 1)" class="btn btn-secondary">+</button>
          <button onclick="removeFromCart(${id})" class="btn btn-danger">Remove</button>
        </div>
      </div>
    `;
  }

  summaryContainer.innerHTML = `
    <div class="card" style="padding:16px">
      <h3>Cart Summary</h3>
      <p>Total: <strong>R ${total.toFixed(2)}</strong></p>
      <button class="btn btn-primary" onclick="window.location.href='checkout.html'">Checkout</button>
      <button class="btn btn-danger" onclick="clearCart()" style="margin-top:10px;">Clear Cart</button>
    </div>
  `;
}
