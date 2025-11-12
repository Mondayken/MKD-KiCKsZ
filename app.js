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
    // Update badge on page load
    updateCartBadge();
  });

// --- Update Cart Badge function ---
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// --- Add to Cart function ---
function addToCart(id, size) {
  const cartKey = `${id}|${size}`;
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  cart[cartKey] = (cart[cartKey] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  showNotification(`✅ Added to cart! You now have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart.`);
  updateCartBadge();
}

// --- Show Notification function ---
function showNotification(message) {
  let notification = document.getElementById('cart-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// --- Update Quantity function ---
function updateQuantity(cartKey, delta) {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  if (cart[cartKey]) {
    cart[cartKey] += delta;
    if (cart[cartKey] <= 0) {
      delete cart[cartKey];
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// --- Remove from Cart function ---
function removeFromCart(cartKey) {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  delete cart[cartKey];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// --- Clear Cart function ---
function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
  updateCartBadge();
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
    updateCartBadge();
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  for (const [cartKey, qty] of Object.entries(cart)) {
    const [id, size] = cartKey.split('|');
    const p = products.find(x => x.id == id);
    if (!p) continue;
    const subtotal = p.price * qty;
    total += subtotal;

    cartContainer.innerHTML += `
      <div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
        <img src="${p.image}" alt="${p.name}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">
        <div style="flex:1;">
          <strong>${p.name}</strong><br>
          <span>Size: ${size}</span><br>
          <span>Price: R ${p.price}</span><br>
          <span>Subtotal: R ${subtotal}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button onclick="updateQuantity('${cartKey}', -1)" class="btn btn-secondary">-</button>
          <span>Qty: ${qty}</span>
          <button onclick="updateQuantity('${cartKey}', 1)" class="btn btn-secondary">+</button>
          <button onclick="removeFromCart('${cartKey}')" class="btn btn-danger">Remove</button>
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
  updateCartBadge();
}
