// Данные товаров
const products = [
    // Майнкрафт услуги
    { id: 1, category: 'minecraft', catName: '⚙️ Майнкрафт', name: 'Загрузка сборки', price: 99, popular: true },
    { id: 2, category: 'minecraft', catName: '⚙️ Майнкрафт', name: 'Настройка плагинов', price: '299 - 999', desc: 'Любые плагины под ваш сервер' },
    { id: 3, category: 'minecraft', catName: '⚙️ Майнкрафт', name: 'Полная настройка сервера', price: '1999 - 9999', popular: true, desc: 'Под ключ' },
    
    // Промокоды Standoff 2
    { id: 4, category: 'promo', catName: '🔪 Промокоды', name: 'Tanto', price: 119, inStock: true },
    { id: 5, category: 'promo', catName: '🔪 Промокоды', name: 'Kerambit', price: 279, inStock: true },
    { id: 6, category: 'promo', catName: '🔪 Промокоды', name: 'Butterfly', price: 199, inStock: true },
    { id: 7, category: 'promo', catName: '🔪 Промокоды', name: 'Stiletto', price: 189, inStock: false },
    { id: 8, category: 'promo', catName: '🔪 Промокоды', name: 'Fang', price: 249, inStock: true },
    
    // Буст аккаунтов
    { id: 9, category: 'boost', catName: '🚀 Буст акков', name: 'Silver 1/4', price: 99 },
    { id: 10, category: 'boost', catName: '🚀 Буст акков', name: 'Gold 1/4', price: 199 },
    { id: 11, category: 'boost', catName: '🚀 Буст акков', name: 'Pheonix', price: 379 },
    { id: 12, category: 'boost', catName: '🚀 Буст акков', name: 'Renger', price: 689 },
    { id: 13, category: 'boost', catName: '🚀 Буст акков', name: 'Master', price: 999 },
    { id: 14, category: 'boost', catName: '🚀 Буст акков', name: 'Другие ранги', price: 1999, desc: 'Любой ранг' }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Состояние приложения
let currentCategory = 'all';
let searchQuery = '';

// Рендер товаров
function renderProducts() {
    const container = document.getElementById('products');
    if (!container) return;
    
    let filteredProducts = products;
    
    // Фильтр по категории
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }
    
    // Поиск
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.catName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Группировка
    const categories = {};
    filteredProducts.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = {
                name: product.catName,
                items: []
            };
        }
        categories[product.category].items.push(product);
    });
    
    let html = '';
    
    // Статистика
    html += `<div class="stats">📊 Товаров: ${filteredProducts.length}</div>`;
    
    // Категории
    for (let cat in categories) {
        html += `
            <div class="category-block">
                <h2 class="category-title" onclick="toggleCategory('${cat}')">
                    ${categories[cat].name} 
                    <span class="count">${categories[cat].items.length}</span>
                </h2>
                <div class="category-grid" id="cat-${cat}">
        `;
        
        categories[cat].items.forEach(item => {
            const popularBadge = item.popular ? '<span class="badge">🔥 Хит</span>' : '';
            const stockBadge = item.inStock === false ? '<span class="badge out">❌ Нет в наличии</span>' : '';
            const descText = item.desc ? `<div class="desc">${item.desc}</div>` : '';
            
            html += `
                <div class="product-card" data-id="${item.id}" onclick="showProductDetails(${item.id})">
                    ${popularBadge}
                    ${stockBadge}
                    <span class="cat">${item.catName}</span>
                    <div class="name">${item.name}</div>
                    ${descText}
                    <div class="price">${item.price}₽</div>
                    <button class="add-to-cart" onclick="addToCart(${item.id}); event.stopPropagation()">
                        🛒 В корзину
                    </button>
                </div>
            `;
        });
        
        html += '</div></div>';
    }
    
    container.innerHTML = html;
    updateCartCount();
}

// Добавление в корзину
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`✅ ${product.name} добавлен в корзину`);
}

// Удалить из корзины
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

// Очистить корзину
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

// Показать корзину
function showCart() {
    const container = document.getElementById('products');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart">🛒 Корзина пуста</div>';
        return;
    }
    
    let total = 0;
    let html = '<h2 class="category-title">🛒 Ваша корзина</h2><div class="category-grid">';
    
    cart.forEach(item => {
        const priceNum = parseInt(item.price) || 0;
        total += priceNum;
        
        html += `
            <div class="product-card cart-item">
                <span class="cat">${item.catName}</span>
                <div class="name">${item.name}</div>
                <div class="price">${item.price}₽</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">❌ Удалить</button>
            </div>
        `;
    });
    
    html += `</div>
        <div class="cart-total">
            <strong>Итого: ${total}₽</strong>
            <button class="checkout-btn" onclick="checkout()">📩 Оформить в TG</button>
            <button class="clear-btn" onclick="clearCart()">🗑️ Очистить</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Оформление заказа
function checkout() {
    let message = 'Заказ:%0A';
    cart.forEach(item => {
        message += `- ${item.name} (${item.price}₽)%0A`;
    });
    window.open(`https://t.me/MrCraftLuxeTT?text=${message}`, '_blank');
}

// Обновить счетчик корзины
function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        const header = document.querySelector('h1');
        header.innerHTML += ' <span id="cart-count" class="cart-count">0</span>';
        cartCount = document.getElementById('cart-count');
    }
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

// Показать детали товара
function showProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    alert(`
        ${product.name}
        Категория: ${product.catName}
        Цена: ${product.price}₽
        ${product.desc || ''}
        Для заказа пишите в Telegram
    `);
}

// Переключить категорию
function toggleCategory(cat) {
    const grid = document.getElementById(`cat-${cat}`);
    if (grid) {
        grid.style.display = grid.style.display === 'none' ? 'grid' : 'none';
    }
}

// Поиск
function searchProducts() {
    const input = document.getElementById('search-input');
    if (input) {
        searchQuery = input.value;
        renderProducts();
    }
}

// Уведомления
function showNotification(text) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = text;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

// Создать панель управления
function createControls() {
    const container = document.getElementById('products');
    if (!container) return;
    
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <div class="search-box">
            <input type="text" id="search-input" placeholder="🔍 Поиск..." onkeyup="searchProducts()">
        </div>
        <div class="filters">
            <button onclick="filterCategory('all')" class="filter-btn active">Все</button>
            <button onclick="filterCategory('minecraft')" class="filter-btn">⚙️ Майнкрафт</button>
            <button onclick="filterCategory('promo')" class="filter-btn">🔪 Промокоды</button>
            <button onclick="filterCategory('boost')" class="filter-btn">🚀 Буст</button>
        </div>
        <div class="cart-controls">
            <button onclick="showCart()" class="cart-btn">🛒 Корзина</button>
            <button onclick="renderProducts()" class="home-btn">🏠 Главная</button>
        </div>
    `;
    
    container.parentNode.insertBefore(controls, container);
}

// Фильтр по категории
function filterCategory(cat) {
    currentCategory = cat;
    renderProducts();
    
    // Обновить активную кнопку
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Сохранить данные
function saveToFile() {
    const data = JSON.stringify(products, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
}

// Инициализация
function init() {
    renderProducts();
    createControls();
    console.log('✅ MrCraftLuxe Shop v2.0 загружен!');
    console.log('📦 Товаров:', products.length);
}

// Запуск
init();
