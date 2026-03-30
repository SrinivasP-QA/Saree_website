// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('ks_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('ks_wishlist') || '[]');
let currentFilter = 'all';
let searchQuery = '';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  initScrollEffects();
});

// ===== PRODUCT RENDERING =====
function renderProducts(productsToRender) {
  const grid = document.getElementById('productsGrid');
  let list = productsToRender || PRODUCTS;

  if (currentFilter !== 'all') {
    list = list.filter(p => p.category === currentFilter);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `<div class="no-results"><i class="fa fa-search"></i><p>No sarees found. Try a different filter.</p></div>`;
    return;
  }

  grid.innerHTML = list.map(p => productCard(p)).join('');
}

function productCard(p) {
  const inWishlist = wishlist.includes(p.id);
  const stars = starRating(p.rating);
  return `
  <div class="product-card" data-id="${p.id}" data-category="${p.category}">
    <div class="card-image-wrap">
      <img src="${p.image}" alt="${p.name}" class="card-img" loading="lazy"/>
      <div class="card-badge">${p.badge}</div>
      <div class="card-discount">${p.discount}</div>
      <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlistItem(event,${p.id})" title="Wishlist">
        <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
      </button>
      <div class="card-overlay">
        <button class="btn-overlay" onclick="openModal(${p.id})">Quick View</button>
      </div>
    </div>
    <div class="card-body">
      <p class="card-fabric">${p.fabric}</p>
      <h3 class="card-name">${p.name}</h3>
      <div class="card-rating">${stars} <span>(${p.reviews})</span></div>
      <div class="card-price">
        <span class="price-current">₹${p.discountPrice.toLocaleString('en-IN')}</span>
        <span class="price-original">₹${p.price.toLocaleString('en-IN')}</span>
      </div>
      <div class="card-actions">
        <button class="btn-cart" onclick="addToCart(${p.id})"><i class="fa fa-shopping-bag"></i> Add to Cart</button>
        <button class="btn-view" onclick="openModal(${p.id})">Details</button>
      </div>
    </div>
  </div>`;
}

function starRating(r) {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
  if (half) html += '<i class="fas fa-star-half-stroke"></i>';
  html += `<strong>${r}</strong>`;
  return html;
}

// ===== FILTER =====
function setFilter(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = cat;
  renderProducts();
  scrollTo('products');
}

function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase().replace(/\s/g,'') === cat.replace(/\s/g,''));
  });
  renderProducts();
  scrollTo('products');
}

// ===== SEARCH =====
function handleSearch(val) {
  searchQuery = val.trim();
  renderProducts();
  if (searchQuery) scrollTo('products');
}

// ===== PRODUCT MODAL =====
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const inWishlist = wishlist.includes(p.id);
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-image">
      <img src="${p.image}" alt="${p.name}"/>
      <div class="modal-badge">${p.badge}</div>
    </div>
    <div class="modal-info">
      <p class="modal-fabric">${p.fabric} · ${p.color}</p>
      <h2>${p.name}</h2>
      <div class="modal-rating">${starRating(p.rating)} <span>(${p.reviews} reviews)</span></div>
      <div class="modal-price">
        <span class="price-current big">₹${p.discountPrice.toLocaleString('en-IN')}</span>
        <span class="price-original">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="modal-discount-tag">${p.discount}</span>
      </div>
      <div class="modal-meta">
        <div><i class="fa fa-palette"></i><span>Color: ${p.color}</span></div>
        <div><i class="fa fa-tag"></i><span>Occasion: ${p.occasion}</span></div>
        <div><i class="fa fa-gem"></i><span>Fabric: ${p.fabric}</span></div>
      </div>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-delivery">
        <i class="fa fa-truck"></i>
        <span>Free delivery · Estimated 5–7 business days · Easy 7-day returns</span>
      </div>
      <div class="modal-actions">
        <button class="btn-primary" onclick="addToCart(${p.id}); closeModal()"><i class="fa fa-shopping-bag"></i> Add to Cart</button>
        <button class="btn-outline" onclick="buyNow(${p.id})"><i class="fa fa-bolt"></i> Buy Now</button>
        <button class="btn-wish ${inWishlist ? 'active' : ''}" onclick="toggleWishlistItem(event,${p.id}); this.classList.toggle('active')">
          <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
        </button>
      </div>
    </div>`;
  document.getElementById('modalOverlay').classList.add('show');
  document.getElementById('productModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  document.getElementById('productModal').classList.remove('show');
  document.body.style.overflow = '';
}

// ===== CART =====
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.discountPrice, image: p.image, qty: 1, fabric: p.fabric });
  }
  saveCart();
  updateCartUI();
  showToast(`"${p.name}" added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) { removeFromCart(id); return; }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('ks_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
  document.getElementById('cartItemCount').textContent = `(${count} item${count !== 1 ? 's' : ''})`;
}

function openCart() {
  renderCartItems();
  document.getElementById('cartOverlay').classList.add('show');
  document.getElementById('cartDrawer').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('show');
  document.getElementById('cartDrawer').classList.remove('show');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart"><i class="fa fa-shopping-bag"></i><p>Your cart is empty</p><button class="btn-primary" onclick="closeCart()">Continue Shopping</button></div>`;
    footer.style.display = 'none';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}"/>
      <div class="ci-info">
        <p class="ci-name">${item.name}</p>
        <p class="ci-fabric">${item.fabric}</p>
        <div class="ci-bottom">
          <div class="qty-ctrl">
            <button onclick="changeQty(${item.id},-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id},1)">+</button>
          </div>
          <span class="ci-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
          <button class="ci-remove" onclick="removeFromCart(${item.id})"><i class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('subtotal').textContent = `₹${total.toLocaleString('en-IN')}`;
  document.getElementById('grandTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
  footer.style.display = 'block';
}

// ===== CHECKOUT =====
function openCheckout() {
  if (cart.length === 0) { showToast('Cart is empty!'); return; }
  closeCart();
  renderSummary();
  document.getElementById('checkoutOverlay').classList.add('show');
  document.getElementById('checkoutModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('show');
  document.getElementById('checkoutModal').classList.remove('show');
  document.body.style.overflow = '';
}

function renderSummary() {
  const container = document.getElementById('summaryItems');
  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}"/>
      <div>
        <p>${item.name}</p>
        <p class="ci-fabric">Qty: ${item.qty}</p>
      </div>
      <span>₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
    </div>`).join('');
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('co-subtotal').textContent = `₹${total.toLocaleString('en-IN')}`;
  document.getElementById('co-total').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function placeOrder(e) {
  e.preventDefault();
  const name = document.getElementById('co-name').value;
  showToast(`🎉 Order placed successfully! Thank you, ${name}!`);
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  setTimeout(() => {
    alert(`✅ Order Confirmed!\n\nThank you for shopping with Kanjeevaram Silks.\nYour order will be delivered in 5–7 business days.\nWe'll send a confirmation on your WhatsApp/SMS!`);
  }, 500);
}

function buyNow(id) {
  addToCart(id);
  closeModal();
  setTimeout(openCheckout, 300);
}

// ===== WISHLIST =====
function toggleWishlistItem(e, id) {
  e.stopPropagation();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
  } else {
    wishlist.push(id);
    showToast('Added to wishlist!');
  }
  localStorage.setItem('ks_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = wishlist.length);
}

function toggleWishlist() {
  showToast(`You have ${wishlist.length} item(s) in wishlist`);
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== NAV =====
function toggleMenu() {
  document.getElementById('nav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ===== SCROLL =====
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initScrollEffects() {
  const header = document.getElementById('header');
  const scrollBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .review-card, .cat-card, .about-grid, .value-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ===== FAQ =====
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  if (!isOpen) answer.classList.add('open');
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const input = document.querySelector('.nl-input');
  if (!input.value) { showToast('Please enter your email!'); return; }
  showToast('🎉 Subscribed successfully! Welcome to our inner circle.');
  input.value = '';
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  showToast('✅ Message sent! We\'ll get back to you within 24 hours.');
  e.target.reset();
}
