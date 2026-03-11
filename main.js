const products = [
    // Майнкрафт услуги
    { cat: '⚙️ Майнкрафт', name: 'Загрузка сборки', price: 99 },
    { cat: '⚙️ Майнкрафт', name: 'Настройка плагинов', price: '299 - 999' },
    { cat: '⚙️ Майнкрафт', name: 'Полная настройка сервера', price: '1999 - 9999' },
    // Промокоды Standoff 2
    { cat: '🔪 Промокоды Standoff 2', name: 'Промокод Tanto', price: 119 },
    { cat: '🔪 Промокоды Standoff 2', name: 'Промокод Butterfly', price: 199 },
    { cat: '🔪 Промокоды Standoff 2', name: 'Промокод Stiletto', price: 189 },
    { cat: '🔪 Промокоды Standoff 2', name: 'Промокод Fang', price: 249 },
    { cat: '🔪 Промокоды Standoff 2', name: 'Промокод Kerambit', price: 279 },
    // Буст аккаунтов
    { cat: '🚀 Буст акков Standoff', name: 'Silver 1/4', price: 99 },
    { cat: '🚀 Буст акков Standoff', name: 'Gold 1/4', price: 199 },
    { cat: '🚀 Буст акков Standoff', name: 'Pheonix', price: 379 },
    { cat: '🚀 Буст акков Standoff', name: 'Renger', price: 689 },
    { cat: '🚀 Буст акков Standoff', name: 'Master', price: 999 },
    { cat: '🚀 Буст акков Standoff', name: 'Другие ранги', price: 1999 }
];

function renderProducts() {
    const container = document.getElementById('products');
    container.innerHTML = products.map(p => 
        `<div class="product-card">
            <span class="cat">${p.cat}</span>
            <div class="name">${p.name}</div>
            <div class="price">${p.price}₽</div>
        </div>`
    ).join('');
}

renderProducts();
