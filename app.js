// app.js
const PRODUCTS_URL = 'products.json';
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')||'{}'); // key: "<id>|<size>"
window.__cart = cart;

async function fetchProducts(){
  products = await fetch(PRODUCTS_URL).then(r=>r.json());
  window.__products = products;
  renderCatalog();
  renderFeatured();
  updateCartCount();
  renderCartPage();
}

function findImagePath(p){
  // try explicit image first
  if(p.image && p.image.trim()) return p.image;
  const sku = p.sku ? p.sku.toString().toLowerCase() : '';
  const tryPaths = [
    `images/airjordan/${sku}.png`,
    `images/airjordan/${sku}.jpg`,
    `images/airjordan/${sku}.jpeg`,
    `images/nike/${sku}.png`,
    `images/nike/${sku}.jpg`,
    `images/nike/${sku}.jpeg`
  ];
  for(const t of tryPaths){
    // NOTE: we can't sync-check file existence from browser; just return first candidate. If missing, browser shows broken image.
    return t;
  }
  return '';
}

function formatPrice(p){ return 'R ' + Number(p).toFixed(2); }

function renderFeatured(){
  // show first few from each category on homepage
  const el = document.getElementById('products');
  if(!el) return;
  el.innerHTML = '';
  const aj = products.filter(p=>p.category.toLowerCase().includes('jordan')).slice(0,4);
  const nk = products.filter(p=>p.category.toLowerCase().includes('nike')).slice(0,4);
  const combined = aj.concat(nk);
  combined.forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    const img = findImagePath(p);
    d.innerHTML = `<img src="${img}" alt=""><div class="title-small">SKU: ${p.sku} • PK: ${p.id}</div><h3>${p.name}</h3><div class="price">${p.display_price || formatPrice(p.price)}</div>
      <div class="controls">
        <select class="size" id="size-${p.id}">${Array.from({length:14},(_,i)=>36+i).map(s=>`<option value="${s}">${s}</option>`).join('')}</select>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to cart</button>
      </div>`;
    el.appendChild(d);
  });
}

function renderCatalog(){
  // used by brand pages if they call renderCatalog (not used for brand pages that fetch separately)
  const el = document.getElementById('products');
  if(!el) return;
  el.innerHTML = '';
  products.forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    const img = findImagePath(p);
    d.innerHTML = `<img src="${img}" alt=""><div class="title-small">SKU: ${p.sku} • PK: ${p.id}</div><h3>${p.name}</h3><div class="price">${p.display_price || formatPrice(p.price)}</div>
      <div class="controls">
        <select class="size" id="size-${p.id}">${Array.from({length:14},(_,i)=>36+i).map(s=>`<option value="${s}">${s}</option>`).join('')}</select>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to cart</button>
      </div>`;
    el.appendChild(d);
  });
}

function addToCart(id){
  const sizeEl = document.getElementById('size-'+id);
  const size = sizeEl ? sizeEl.value : 'NA';
  const key = id + '|' + size;
  cart[key] = (cart[key]||0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  window.__cart = cart;
  updateCartCount();
  alert('Added to cart (size '+size+')');
}

function updateCartCount(){
  const el = document.getElementById('cart-count');
  if(el) el.textContent = Object.values(cart).reduce((a,b)=>a+b,0);
}

function renderCartPage(){
  const root = document.getElementById('cart-items');
  if(!root) return;
  root.innerHTML = '';
  const entries = Object.entries(cart);
  if(entries.length===0){
    root.innerHTML = '<div class="card small">Your cart is empty.</div>';
    renderSummary();
    return;
  }
  entries.forEach(([k,qty])=>{
    const [id,size] = k.split('|');
    const p = products.find(x=>x.id==id);
    if(!p) return;
    const img = findImagePath(p);
    const div = document.createElement('div'); div.className='cart-item';
    div.innerHTML = `<img class="cart-thumb" src="${img}"><div style="flex:1"><div style="font-weight:700">${p.name}</div><div class="small">Size: ${size} • SKU: ${p.sku}</div><div>Qty: ${qty}</div></div><div style="font-weight:800">${p.display_price || formatPrice(p.price)}</div>`;
    root.appendChild(div);
  });
  renderSummary();
}

function renderSummary(){
  const el = document.getElementById('cart-summary') || document.getElementById('order-summary');
  if(!el) return;
  const items = Object.entries(cart).map(([k,qty])=>{
    const [id,size] = k.split('|');
    const p = products.find(x=>x.id==id);
    return p ? {p, qty, size} : null;
  }).filter(Boolean);
  if(items.length===0){ el.innerHTML = '<div class="small">No items.</div>'; return; }
  const subtotal = items.reduce((s,it)=> s + it.p.price * it.qty, 0);
  el.innerHTML = `<div><div style="display:flex;justify-content:space-between"><div class="small">Subtotal</div><div class="small">R ${subtotal.toFixed(2)}</div></div>
    <div style="display:flex;justify-content:space-between;margin-top:6px"><div class="small">Shipping</div><div class="small">R 0.00</div></div><hr>
    <div style="display:flex;justify-content:space-between;font-weight:800"><div>Total</div><div>R ${subtotal.toFixed(2)}</div></div>
    <div style="margin-top:8px"><a class="btn btn-primary" href="checkout.html">Proceed to checkout</a></div></div>`;
}

// Submit order to serverless endpoint after PayPal capture
async function submitOrderToServer(orderPayload){
  const endpoints = ['/api/orders','/.netlify/functions/orders'];
  const secret = 'REPLACE_WITH_DEPLOY_SECRET'; // set to same MKD_SECRET used on Netlify/Vercel
  for(const e of endpoints){
    try{
      const r = await fetch(e, {
        method:'POST',
        headers:{'Content-Type':'application/json','x-mkd-secret': secret},
        body: JSON.stringify(orderPayload)
      });
      if(r.ok) return await r.json();
    }catch(err){
      // try next
    }
  }
  throw new Error('Could not reach serverless order endpoint');
}

document.addEventListener('DOMContentLoaded', ()=>{ fetchProducts(); });
