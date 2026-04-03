const games = [
    { id: 1, title: "Elden Ring", price: 59.99, genre: "RPG", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=500" },
    { id: 2, title: "Call of Duty", price: 69.99, genre: "FPS", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500" },
    { id: 3, title: "God of War", price: 49.99, genre: "Action", image: "https://images.unsplash.com/photo-1605898835371-15c88b374bc3?q=80&w=500" },
    { id: 4, title: "Cyberpunk 2077", price: 39.99, genre: "RPG", image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?q=80&w=500" },
    { id: 5, title: "Doom Eternal", price: 29.99, genre: "FPS", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=500" },
    { id: 6, title: "Spider-Man 2", price: 79.99, genre: "Action", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500" },
];
let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];
const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartSection = document.getElementById('cartSection');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
function displayGames(filteredGames) {
    gamesGrid.innerHTML = filteredGames.map(game => `
        <div class="game-card bg-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div class="relative h-56 overflow-hidden">
                <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover">
                <span class="absolute top-3 left-3 bg-primary/80 text-secondary text-[10px] font-black px-3 py-1 rounded-full">
                    ${game.genre}
                </span>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between">
                <h3 class="text-xl font-bold mb-4 text-light">${game.title}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-black text-secondary">${game.price} €</span>
                    <button onclick="addToCart(${game.id})" class="bg-secondary text-primary px-4 py-2 rounded-lg font-bold">
                        + AJOUTER
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}
function handleFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.filter-btn.bg-secondary');
    const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';

    const filtered = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || game.genre === activeCategory;
        return matchesSearch && matchesCategory;
    });

    displayGames(filtered);
}
window.addToCart = (id) => {
    const game = games.find(g => g.id === id);
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({ ...game, quantity: 1 });
    }

    updateCart();
};

function updateCart() {
    localStorage.setItem('gamevault_cart', JSON.stringify(cart));
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    renderCart();
}
function renderCart() {
    cartItemsContainer.innerHTML = cart.length === 0 
        ? `<p class="text-center py-10">Votre panier est vide...</p>`
        : cart.map(item => `
        <div class="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
            <img src="${item.image}" class="w-16 h-16 object-cover rounded-xl">
            <div class="flex-grow">
                <h4 class="font-bold">${item.title}</h4>
                <p>${item.price} €</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})">X</button>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.innerText = `${total.toFixed(2)} €`;
}
window.changeQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    item.quantity += delta;

    if (item.quantity < 1) return removeFromCart(id);

    updateCart();
};
window.removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    updateCart();
};