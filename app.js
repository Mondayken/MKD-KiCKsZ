// --- Load product data globally ---
const products = [
  {
    "id": 1,
    "sku": "FC001",
    "name": "AF1",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/AF1.jpeg",
    "description": ""
  },
  {
    "id": 2,
    "sku": "FC002",
    "name": "TN 01",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-01.jpeg",
    "description": ""
  },
  {
    "id": 3,
    "sku": "FC003",
    "name": "TN 02",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-02.jpeg",
    "description": ""
  },
  {
    "id": 4,
    "sku": "FC004",
    "name": "TN 03",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-03.jpeg",
    "description": ""
  },
  {
    "id": 5,
    "sku": "FC005",
    "name": "TN 04",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-04.jpeg",
    "description": ""
  },
  {
    "id": 6,
    "sku": "FC006",
    "name": "TN 05",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-05.jpeg",
    "description": ""
  },
  {
    "id": 7,
    "sku": "FC007",
    "name": "TN 06",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-06.jpeg",
    "description": ""
  },
  {
    "id": 8,
    "sku": "FC008",
    "name": "TN 07",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-07.jpeg",
    "description": ""
  },
  {
    "id": 9,
    "sku": "FC009",
    "name": "TN 08",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-08.jpeg",
    "description": ""
  },
  {
    "id": 10,
    "sku": "FC010",
    "name": "TN 09",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-09.jpeg",
    "description": ""
  },
  {
    "id": 11,
    "sku": "FC011",
    "name": "TN 10",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-10.jpeg",
    "description": ""
  },
  {
    "id": 12,
    "sku": "FC012",
    "name": "TN 11",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-11.jpeg",
    "description": ""
  },
  {
    "id": 13,
    "sku": "FC013",
    "name": "TN 12",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-12.jpeg",
    "description": ""
  },
  {
    "id": 14,
    "sku": "FC014",
    "name": "TN 14",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-14.jpeg",
    "description": ""
  },
  {
    "id": 15,
    "sku": "FC015",
    "name": "TN 15",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-15.jpeg",
    "description": ""
  },
  {
    "id": 16,
    "sku": "FC016",
    "name": "TN 16",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-16.jpeg",
    "description": ""
  },
  {
    "id": 17,
    "sku": "FC017",
    "name": "TN 17",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-17.jpeg",
    "description": ""
  },
  {
    "id": 18,
    "sku": "FC018",
    "name": "TN 18",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-18.jpeg",
    "description": ""
  },
  {
    "id": 19,
    "sku": "FC019",
    "name": "TN 19",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-19.jpeg",
    "description": ""
  },
  {
    "id": 20,
    "sku": "FC020",
    "name": "TN A01",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-A01.jpeg",
    "description": ""
  },
  {
    "id": 21,
    "sku": "FC021",
    "name": "TN A02",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-A02.jpeg",
    "description": ""
  },
  {
    "id": 22,
    "sku": "FC022",
    "name": "TN A03",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Nike",
    "image": "images/nike/TN-A03.jpeg",
    "description": ""
  },
  {
    "id": 23,
    "sku": "MD023",
    "name": "AJ4 1",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-1.png",
    "description": ""
  },
  {
    "id": 24,
    "sku": "MD024",
    "name": "AJ4 10",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-10.png",
    "description": ""
  },
  {
    "id": 25,
    "sku": "MD025",
    "name": "AJ4 11",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-11.png",
    "description": ""
  },
  {
    "id": 26,
    "sku": "MD026",
    "name": "AJ4 12",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-12.png",
    "description": ""
  },
  {
    "id": 27,
    "sku": "MD027",
    "name": "AJ4 14",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-14.png",
    "description": ""
  },
  {
    "id": 28,
    "sku": "MD028",
    "name": "AJ4 15",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-15.png",
    "description": ""
  },
  {
    "id": 29,
    "sku": "MD029",
    "name": "AJ4 17",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-17.png",
    "description": ""
  },
  {
    "id": 30,
    "sku": "MD030",
    "name": "AJ4 18",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-18.png",
    "description": ""
  },
  {
    "id": 31,
    "sku": "MD031",
    "name": "AJ4 2",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-2.png",
    "description": ""
  },
  {
    "id": 32,
    "sku": "MD032",
    "name": "AJ4 21",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-21.png",
    "description": ""
  },
  {
    "id": 33,
    "sku": "MD033",
    "name": "AJ4 23",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-23.png",
    "description": ""
  },
  {
    "id": 34,
    "sku": "MD034",
    "name": "AJ4 24",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-24.png",
    "description": ""
  },
  {
    "id": 35,
    "sku": "MD035",
    "name": "AJ4 26",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-26.png",
    "description": ""
  },
  {
    "id": 36,
    "sku": "MD036",
    "name": "AJ4 27",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-27.png",
    "description": ""
  },
  {
    "id": 37,
    "sku": "MD037",
    "name": "AJ4 29",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-29.png",
    "description": ""
  },
  {
    "id": 38,
    "sku": "MD038",
    "name": "AJ4 3",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-3.png",
    "description": ""
  },
  {
    "id": 39,
    "sku": "MD039",
    "name": "AJ4 33",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-33.png",
    "description": ""
  },
  {
    "id": 40,
    "sku": "MD040",
    "name": "AJ4 36",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-36.png",
    "description": ""
  },
  {
    "id": 41,
    "sku": "MD041",
    "name": "AJ4 4",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-4.png",
    "description": ""
  },
  {
    "id": 42,
    "sku": "MD042",
    "name": "AJ4 41",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-41.png",
    "description": ""
  },
  {
    "id": 43,
    "sku": "MD043",
    "name": "AJ4 48",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-48.png",
    "description": ""
  },
  {
    "id": 44,
    "sku": "MD044",
    "name": "AJ4 50",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-50.png",
    "description": ""
  },
  {
    "id": 45,
    "sku": "MD045",
    "name": "AJ4 52",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-52.png",
    "description": ""
  },
  {
    "id": 46,
    "sku": "MD046",
    "name": "AJ4 53",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-53.png",
    "description": ""
  },
  {
    "id": 47,
    "sku": "MD047",
    "name": "AJ4 54",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-54.png",
    "description": ""
  },
  {
    "id": 48,
    "sku": "MD048",
    "name": "AJ4 58",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-58.png",
    "description": ""
  },
  {
    "id": 49,
    "sku": "MD049",
    "name": "AJ4 6",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-6.png",
    "description": ""
  },
  {
    "id": 50,
    "sku": "MD050",
    "name": "AJ4 7",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-7.png",
    "description": ""
  },
  {
    "id": 51,
    "sku": "MD051",
    "name": "AJ4 8",
    "price": 1000,
    "currency": "ZAR",
    "display_price": "R 1000.00",
    "category": "Air Jordan",
    "image": "images/airjordan/AJ4-8.png",
    "description": ""
  }
];

window.__products = products;

// Auto-render cart if we are on cart.html
if (window.location.pathname.includes("cart.html")) {
  renderCart();
}
// Update badge on page load
updateCartBadge();

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
