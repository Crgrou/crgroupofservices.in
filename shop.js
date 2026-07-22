// Enhanced Shopping functionality

// Sample products data
const products = [
    {
        id: 1,
        name: "GST Registration Package",
        category: "Documents",
        price: 2499,
        emoji: "📋",
        description: "Complete GST registration documentation and filing",
        fullDescription: "Professional GST registration service with all documentation, IEC code assistance, and government submission."
    },
    {
        id: 2,
        name: "PAN Card Expedited Service",
        category: "Documents",
        price: 1299,
        emoji: "🆔",
        description: "Fast track PAN card application and delivery",
        fullDescription: "Quick PAN card processing with online application and fast delivery to your doorstep."
    },
    {
        id: 3,
        name: "Passport Assistance Package",
        category: "Documents",
        price: 3999,
        emoji: "🛂",
        description: "Complete passport application support",
        fullDescription: "Full passport application assistance including document verification and embassy coordination."
    },
    {
        id: 4,
        name: "Income Tax Return Filing",
        category: "Documents",
        price: 1899,
        emoji: "📊",
        description: "Professional ITR filing and consultation",
        fullDescription: "Expert ITR filing for individuals and businesses with complete tax planning support."
    },
    {
        id: 5,
        name: "MSME Registration Bundle",
        category: "Documents",
        price: 2199,
        emoji: "🏢",
        description: "UDYAM registration and business setup",
        fullDescription: "Complete MSME registration with UDYAM certificate and business documentation support."
    },
    {
        id: 6,
        name: "Digital Signature Certificate",
        category: "Documents",
        price: 3299,
        emoji: "🔐",
        description: "DSC for e-signing and digital documents",
        fullDescription: "Class 3 Digital Signature Certificate for electronic signing and government filings."
    },
    {
        id: 7,
        name: "Flight Ticket Booking Premium",
        category: "Travel",
        price: 299,
        emoji: "✈️",
        description: "Quick booking + customer support",
        fullDescription: "Fast flight booking with 24/7 customer support and flexible cancellation options."
    },
    {
        id: 8,
        name: "Train Ticket Booking Service",
        category: "Travel",
        price: 199,
        emoji: "🚂",
        description: "Easy rail ticket booking assistance",
        fullDescription: "IRCTC ticket booking with seat selection and instant confirmation."
    },
    {
        id: 9,
        name: "Bus Ticket Bundle (10 Trips)",
        category: "Travel",
        price: 1499,
        emoji: "🚌",
        description: "10 bus journeys booking package",
        fullDescription: "Book 10 intercity bus trips with flexible dates and instant confirmation."
    },
    {
        id: 10,
        name: "Health Insurance Package",
        category: "Insurance",
        price: 4999,
        emoji: "🏥",
        description: "Comprehensive health coverage planning",
        fullDescription: "Customized health insurance plans with cashless treatment at network hospitals."
    },
    {
        id: 11,
        name: "Vehicle Insurance Consultation",
        category: "Insurance",
        price: 2999,
        emoji: "🚗",
        description: "Professional insurance guidance and setup",
        fullDescription: "Expert vehicle insurance consultation with best premium options."
    },
    {
        id: 12,
        name: "Life Insurance Advisory",
        category: "Insurance",
        price: 3699,
        emoji: "💼",
        description: "Personalized life coverage plans",
        fullDescription: "Tailored life insurance policies based on your financial needs."
    },
    {
        id: 13,
        name: "Mobile Recharge Credits (₹500)",
        category: "Utilities",
        price: 500,
        emoji: "📱",
        description: "All network recharge options available",
        fullDescription: "Prepaid and postpaid recharge for all major networks with instant activation."
    },
    {
        id: 14,
        name: "Electricity Bill Payment Service",
        category: "Utilities",
        price: 99,
        emoji: "💡",
        description: "Quick bill payment + receipt",
        fullDescription: "Pay electricity bills online with instant receipt and payment confirmation."
    },
    {
        id: 15,
        name: "Water & Gas Bill Package",
        category: "Utilities",
        price: 199,
        emoji: "💧",
        description: "Multiple utility bills in one place",
        fullDescription: "Pay water, gas, and other utility bills through a single platform."
    },
    {
        id: 16,
        name: "Ayushman Bharat Card Registration",
        category: "Documents",
        price: 1599,
        emoji: "🏥",
        description: "Health scheme registration assistance",
        fullDescription: "Complete Ayushman Bharat card registration with eligibility verification and documentation."
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

    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        displayProducts(products);
    });

    // Cart modal
    const cartLink = document.getElementById('cartLink');
    const cartModal = document.getElementById('cartModal');
    const closeButtons = document.querySelectorAll('.close');

    cartLink.addEventListener('click', function(e) {
        e.preventDefault();
        displayCart();
        cartModal.style.display = 'block';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            cartModal.style.display = 'none';
            document.getElementById('detailsModal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target == document.getElementById('detailsModal')) {
            document.getElementById('detailsModal').style.display = 'none';
        }
    });

    // Continue shopping
    document.getElementById('continueShopping').addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('❌ Your cart is empty!', 'error');
            return;
        }
        
        const total = calculateTotal();
        const cartSummary = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
        const message = `Hello! I want to purchase: ${cartSummary}\nSubtotal: ₹${(total * 100 / 105).toFixed(2)}\nTotal with GST: ₹${total.toFixed(2)}\nPlease confirm and provide payment options.`;
        const whatsappUrl = `https://wa.me/917860899678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        showNotification('✅ Opening WhatsApp...', 'success');
        setTimeout(() => {
            cartModal.style.display = 'none';
        }, 1500);
    });
}

function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #999;"><p style="font-size: 1.2rem; margin-bottom: 10px;">🔍 No products found</p><p>Try adjusting your search or filters</p></div>';
        document.getElementById('productCount').textContent = 'Products: 0';
        return;
    }

    document.getElementById('productCount').textContent = `Products: ${productsToDisplay.length}`;

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
                <p class="product-rating">⭐ 4.5 (${Math.floor(Math.random() * 100) + 10} reviews)</p>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decreaseQty(${product.id})">−</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1" max="100">
                        <button class="qty-btn" onclick="increaseQty(${product.id})">+</button>
                    </div>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 12px;">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="view-details-btn" onclick="showProductDetails(${product.id})">Details</button>
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

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const detailsModal = document.getElementById('detailsModal');
    const detailsContent = document.getElementById('productDetails');
    
    detailsContent.innerHTML = `
        <div class="product-details">
            <div class="details-image">${product.emoji}</div>
            <div class="details-info">
                <span class="category">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="price">₹${product.price}</div>
                <p class="description">${product.fullDescription}</p>
                <div class="product-actions" style="margin-top: 25px;">
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decreaseQty(${product.id})">−</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1" max="100">
                        <button class="qty-btn" onclick="increaseQty(${product.id})">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); document.getElementById('detailsModal').style.display='none';">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    detailsModal.style.display = 'block';
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
    showNotification(`✅ ${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    showNotification('🗑️ Item removed from cart');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function calculateTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% GST
    return subtotal + tax;
}

function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTax() {
    return calculateSubtotal() * 0.05;
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    const cartTaxSpan = document.getElementById('cartTax');
    const cartTotalSpan = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><small>Add items to get started</small></div>';
        cartSubtotalSpan.textContent = '0';
        cartTaxSpan.textContent = '0';
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
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
            <div style="font-weight: 700; min-width: 80px; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();

    cartSubtotalSpan.textContent = subtotal.toFixed(2);
    cartTaxSpan.textContent = tax.toFixed(2);
    cartTotalSpan.textContent = total.toFixed(2);
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

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('remove');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}