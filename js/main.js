/**
 * AntiGravity AI Store - Main Script
 */

let cart = JSON.parse(localStorage.getItem('antiGravityCart')) || [];
let currentFilter = 'All';
let isLogged = false;

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderProducts();
    updateCartUI();
    initNewsletter();
    updateDashboard();
    initTheme();
    initMobileMenu();
});

// Mobile Menu Logic
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.querySelector('.nav-links');
    const overlay = document.getElementById('navOverlay');

    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    }

    // Close menu when clicking nav links
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}

// Navigation Logic
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-section');
            showSection(targetId);
        });
    });
}

window.showSection = (id) => {
    if (id === 'profile' && !isLogged) {
        id = 'auth';
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-section') === id) b.classList.add('active');
    });

    sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === id) {
            sec.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    if (id === 'dashboard') updateDashboard();
};

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('antiGravityTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }
}

window.toggleTheme = () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('antiGravityTheme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
};

function updateThemeIcon(isLight) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

// Auth Logic
window.toggleAuth = (mode) => {
    const forms = ['login-form', 'register-form', 'forgot-form', 'otp-form'];
    forms.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.style.display = 'none';
    });

    const activeForm = document.getElementById(`${mode}-form`);
    if (activeForm) activeForm.style.display = 'block';
};

window.handleLogin = (e) => {
    e.preventDefault();
    isLogged = true;
    alert("Neuro-sync successful! Welcome back, Commander John Doe.");
    showSection('profile');
};

window.handleRegister = (e) => {
    e.preventDefault();
    alert("Presence established. Your Neural ID is now active.");
    toggleAuth('login');
};

window.handleForgot = (e) => {
    e.preventDefault();
    alert("OTP sent to your neural link.");
    toggleAuth('otp');
};

window.handleOTP = (e) => {
    e.preventDefault();
    const codes = [document.getElementById('otp1').value, document.getElementById('otp2').value, document.getElementById('otp3').value, document.getElementById('otp4').value];
    if (codes.join('').length < 4) return alert("Please enter the full 4-digit code.");
    alert("Identity verified. Access granted.");
    toggleAuth('login');
};

window.moveFocus = (curr, nextId) => {
    if (curr.value.length === 1) {
        const next = document.getElementById(nextId);
        if (next) next.focus();
    }
};

// Profile Logic
window.switchProfileTab = (tab) => {
    document.querySelectorAll('.profile-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.profile-nav li').forEach(l => l.classList.remove('active'));

    const activeTab = document.getElementById(`p-${tab}`);
    if (activeTab) activeTab.style.display = 'block';

    // Direct matching of text content or attribute for active state
    const navItems = document.querySelectorAll('.profile-nav li');
    navItems.forEach(item => {
        if (item.getAttribute('onclick').includes(`'${tab}'`)) {
            item.classList.add('active');
        }
    });
};

window.copyRefCode = () => {
    const code = document.getElementById('refCode');
    code.select();
    document.execCommand('copy');
    alert("Referral code synced to your neuro-clipboard!");
};

window.handleLogout = () => {
    isLogged = false;
    alert("Neural-session terminated. Securely logged out.");
    showSection('home');
};

// Mock Products Data
const products = [
    { id: 1, name: 'Neural Watch Pro', category: 'Wearables', price: 249.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', desc: 'Advanced biometric tracking with neural link.' },
    { id: 2, name: 'Gravity Hover Board', category: 'Mobility', price: 1299.00, image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&q=80&w=400', desc: 'Magnetic levitation for smooth urban travel.' },
    { id: 3, name: 'Home AI Core', category: 'Home AI', price: 499.00, image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=400', desc: 'Central brain for your smart living space.' },
    { id: 4, name: 'Light-Speed Backpack', category: 'Wearables', price: 189.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400', desc: 'Solar integrated modular storage system.' },
    { id: 5, name: 'AR Vision Elite', category: 'Wearables', price: 899.00, image: 'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=400', desc: 'Mixed reality glasses with 8K projection.' },
    { id: 6, name: 'Autonomous Delivery Drone', category: 'Mobility', price: 2450.00, image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=400', desc: 'Full-range cargo delivery for personal use.' },
    { id: 7, name: 'Neural-Link Processor', category: 'Home AI', price: 1500.00, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400', desc: 'Direct consciousness processing for high-tier AI nodes.' },
    { id: 8, name: 'Quantum Storage Cube', category: 'Home AI', price: 340.00, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400', desc: 'Multi-dimensional data storage with infinite encryption.' },
    { id: 9, name: 'Orbital Cooling Pad', category: 'Home AI', price: 120.00, image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=400', desc: 'Sub-zero cooling for overclocked neural processors.' },
    { id: 10, name: 'Bio-Sync Glasses', category: 'Wearables', price: 550.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', desc: 'Adaptive lenses with heart-rate and stress monitoring.' },
    { id: 11, name: 'Orbital Desk Lamp', category: 'Home AI', price: 299.00, image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=400', desc: 'Floating light source that mimics Martian sunrise.' },
    { id: 12, name: 'Kinetic Energy Ring', category: 'Wearables', price: 145.00, image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=400', desc: 'Harvests your motion to charge small neural artifacts.' }
];

// Product Rendering with Search/Filter
function renderProducts() {
    const container = document.getElementById('product-container');
    if (!container) return;
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = products.filter(p => (p.name.toLowerCase().includes(searchTerm) || p.desc.toLowerCase().includes(searchTerm)) && (currentFilter === 'All' || p.category === currentFilter));

    container.innerHTML = filtered.length === 0 ? `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-muted)">No artifacts found.</div>` :
        filtered.map(product => `
        <div class="product-card fade-in">
            <div class="product-img"><img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;"><div class="tag" style="position:absolute; top:15px; right:15px; margin:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px)">${product.category}</div></div>
            <div class="product-info"><h3>${product.name}</h3><p class="product-price">$${product.price.toLocaleString()}</p><p style="color: var(--text-secondary); font-size:14px; margin-bottom: 20px; min-height: 40px;">${product.desc}</p><button class="btn btn-outline" style="width:100%" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button></div>
        </div>`).join('');
}

function setFilter(category, btn) {
    currentFilter = category;
    document.querySelectorAll('.filter-group .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}

// Cart Logic
window.toggleCart = () => document.getElementById('cartDrawer').classList.toggle('active');
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, cartId: Date.now() });
    saveCart(); updateCartUI();
    const badge = document.getElementById('cartCount');
    badge.style.transform = 'scale(1.5)'; setTimeout(() => badge.style.transform = 'scale(1)', 300);
};
window.removeFromCart = (cartId) => { cart = cart.filter(item => item.cartId !== cartId); saveCart(); updateCartUI(); };
function saveCart() { localStorage.setItem('antiGravityCart', JSON.stringify(cart)); }
function updateCartUI() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.innerText = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
        badge.style.color = '#000'; // Ensure text color is black on the secondary accent
    }

    const dashBadge = document.getElementById('totalCartCount');
    if (dashBadge) dashBadge.innerText = cart.length;

    const itemsContainer = document.getElementById('cartItems');
    if (itemsContainer) itemsContainer.innerHTML = cart.length === 0 ? `<div style="text-align:center; padding: 40px; color: var(--text-muted)">Empty</div>` :
        cart.map(item => `<div class="cart-product fade-in"><img src="${item.image}" class="cp-img"><div class="cp-info"><h4>${item.name}</h4><span>$${item.price.toLocaleString()}</span></div><button class="close-btn" onclick="removeFromCart(${item.cartId})"><i class="fa-solid fa-trash-can"></i></button></div>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (document.getElementById('cartTotalPrice')) document.getElementById('cartTotalPrice').innerText = `$${total.toLocaleString()}`;
    updateDashboard();
}

window.checkout = () => { if (cart.length === 0) return alert("Empty!"); alert("🚀 Drones dispatched!"); cart = []; saveCart(); updateCartUI(); toggleCart(); };

function updateDashboard() {
    if (document.getElementById('totalRevenue')) document.getElementById('totalRevenue').innerText = `$${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}`;
    if (document.getElementById('totalProducts')) document.getElementById('totalProducts').innerText = products.length;
}


function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); const input = form.querySelector('input'); if (input.value) { alert(`Welcome!`); input.value = ''; } });
}
