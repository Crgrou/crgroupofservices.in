// Shopping functionality

// Sample products data
const products = [
    {
        id: 1,
        name: "GST Registration Package",
        category: "Documents",
        price: 2499,
        emoji: "📋",
        description: "Complete GST registration documentation and filing"
    },
    {
        id: 2,
        name: "PAN Card Expedited Service",
        category: "Documents",
        price: 1299,
        emoji: "🆔",
        description: "Fast track PAN card application and delivery"
    },
    {
        id: 3,
        name: "Passport Assistance Package",
        category: "Documents",
        price: 3999,
        emoji: "🛂",
        description: "Complete passport application support"
    },
    {
        id: 4,
        name: "Income Tax Return Filing",
        category: "Documents",
        price: 1899,
        emoji: "📊",
        description: "Professional ITR filing and consultation"
    },
    {
        id: 5,
        name: "MSME Registration Bundle",
        category: "Documents",
        price: 2199,
        emoji: "🏢",
        description: "UDYAM registration and business setup"
    },
    {
        id: 6,
        name: "Digital Signature Certificate",
        category: "Documents",
        price: 3299,
        emoji: "🔐",
        description: "DSC for e-signing and digital documents"
    },
    {
        id: 7,
        name: "Flight Ticket Booking Premium",
        category: "Travel",
        price: 299,
        emoji: "✈️",
        description: "Quick booking + customer support"
    },
    {
        id: 8,
        name: "Train Ticket Booking Service",
        category: "Travel",
        price: 199,
        emoji: "🚂",
        description: "Easy rail ticket booking assistance"
    },
    {
        id: 9,
        name: "Bus Ticket Bundle (10 Trips)",
        category: "Travel",
        price: 1499,
        emoji: "🚌",
        description: "10 bus journeys booking package"
    },
    {
        id: 10,
        name: "Health Insurance Package",
        category: "Insurance",
        price: 4999,
        emoji: "🏥",
        description: "Comprehensive health coverage planning"
    },
    {
        id: 11,
        name: "Vehicle Insurance Consultation",
        category: "Insurance",
        price: 2999,
        emoji: "🚗",
        description: "Professional insurance guidance and setup"
    },
    {
        id: 12,
        name: "Life Insurance Advisory",
        category: "Insurance",
        price: 3699,
        emoji: "💼",
        description: "Personalized life coverage plans"
    },
    {
        id: 13,
        name: "Mobile Recharge Credits (₹500)",
        category: "Utilities",
        price: 500,
        emoji: "📱",
        description: "All network recharge options available"
    },
    {
        id: 14,
        name: "Electricity Bill Payment Service",
        category: "Utilities",
        price: 99,
        emoji: "💡",
        description: "Quick bill payment + receipt"
    },
    {
        id: 15,
        name: "Water & Gas Bill Package",
        category: "Utilities",
        price: 199,
        emoji: "💧",
        description: "Multiple utility bills in one place"
    },
    {
        id: 16,
        name: "Ayushman Bharat Card Registration",
        category: "Documents",
        price: 1599,
        emoji: "🏥",
        description: "Health scheme registration assistance"
    },
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('keyup', function() {
        filterProducts();
    });

    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', function() {
        filterProducts();
    });

    // Cart modal
    const cartLink = document.querySelector('.cart-link');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');

    cartLink.addEventListener('click', function(e) {
        e.preventDefault();
        displayCart();
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = calculateTotal();
        const message = `I want to purchase items worth ₹${total}. Please confirm and provide payment options.`;
        const whatsappUrl = `https://wa.me/917860899678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        cartModal.style.display = 'none';
    });
}

function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">₹${product.price}</p>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decreaseQty(${product.id})">−</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1" max="100">
                        <button class="qty-btn" onclick="increaseQty(${product.id})">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

function getQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    return parseInt(qtyInput?.value) || 1;
}

function increaseQty(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        qtyInput.value = Math.min(100, parseInt(qtyInput.value) + 1);
    }
}

function decreaseQty(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = getQuantity(productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Reset quantity input
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        qtyInput.value = 1;
    }

    // Show confirmation
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    showNotification('Item removed from cart');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        cartTotalSpan.textContent = '0';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                <span style="margin: 0 10px; font-weight: 600;">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
            <div style="font-weight: 600; min-width: 70px;">₹${item.price * item.quantity}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    cartTotalSpan.textContent = calculateTotal();
}

function updateCartQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
