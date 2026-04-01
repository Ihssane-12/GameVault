const gameList = [
  { id: 1, title: "Cyber Drift", genre: "Racing", price: 19.99, rating: 4.4, image: "https://picsum.photos/seed/game1/600/400" },
  { id: 2, title: "Kingdom Forge", genre: "RPG", price: 39.99, rating: 4.8, image: "https://picsum.photos/seed/game2/600/400" },
  { id: 3, title: "Shadow Strike", genre: "Action", price: 29.99, rating: 4.5, image: "https://picsum.photos/seed/game3/600/400" },
  { id: 4, title: "Sky Builders", genre: "Simulation", price: 24.99, rating: 4.2, image: "https://picsum.photos/seed/game4/600/400" },
  { id: 5, title: "Star Tactics", genre: "Strategy", price: 34.99, rating: 4.6, image: "https://picsum.photos/seed/game5/600/400" },
  { id: 6, title: "Pixel Quest", genre: "Adventure", price: 14.99, rating: 4.1, image: "https://picsum.photos/seed/game6/600/400" }
];
const appState = { selectedCategory: 'All', searchText: '', cart: [] };

const elements = {
  homeBtn: document.getElementById('homeBtn'),
  cartBtn: document.getElementById('cartBtn'),
  mobileCartBtn: document.getElementById('mobileCartBtn'),
  homePage: document.getElementById('homePage'),
  cartPage: document.getElementById('cartPage'),
  searchInput: document.getElementById('searchInput'),
  categoryFilters: document.getElementById('categoryFilters'),
  gamesGrid: document.getElementById('gamesGrid'),
  cartItems: document.getElementById('cartItems'),
  summaryItems: document.getElementById('summaryItems'),
  summarySubtotal: document.getElementById('summarySubtotal'),
  summaryTotal: document.getElementById('summaryTotal'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  continueShoppingBtn: document.getElementById('continueShoppingBtn')
};

function toPriceText(value) {
  return '$' + value.toFixed(2);
}

const categoryList = ['All', 'Action', 'Adventure', 'RPG', 'Racing', 'Simulation', 'Strategy'];

function getVisibleGames() {
  return gameList.filter((game) => {
    const categoryOk = appState.selectedCategory === 'All' || game.genre === appState.selectedCategory;
    const searchOk = game.title.toLowerCase().includes(appState.searchText.toLowerCase().trim());
    return categoryOk && searchOk;
  });
}

function renderCategoryButtons() {
  elements.categoryFilters.innerHTML = categoryList.map((category) => {
    const isActive = appState.selectedCategory === category;
    return `<button type="button" data-category="${category}" class="rounded-full border px-3 py-1 text-sm ${isActive ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}">${category}</button>`;
  }).join('');
}

function renderGameCards() {
  const visibleGames = getVisibleGames();
  elements.gamesGrid.innerHTML = visibleGames.map((game) => {
    return `<article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"><img src="${game.image}" alt="${game.title}" class="h-40 w-full object-cover" /><div class="p-4"><p class="text-xs font-medium uppercase tracking-wide text-slate-500">${game.genre}</p><h3 class="mt-1 text-base font-semibold text-slate-900">${game.title}</h3><p class="mt-1 text-sm text-slate-600">Rating: ${game.rating}</p><div class="mt-3 flex items-center justify-between"><span class="text-sm font-bold text-slate-900">${toPriceText(game.price)}</span><button type="button" data-game-id="${game.id}" class="rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700">Add to Cart</button></div></div></article>`;
  }).join('');
}

renderCategoryButtons();
renderGameCards();

elements.categoryFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  appState.selectedCategory = button.dataset.category;
  renderCategoryButtons();
  renderGameCards();
});

elements.searchInput.addEventListener('input', (event) => {
  appState.searchText = event.target.value;
  renderGameCards();
});

elements.gamesGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-game-id]');
  if (!button) return;
  const gameId = Number(button.dataset.gameId);
  addGameToCart(gameId);
});

function addGameToCart(gameId) {
  const existingItem = appState.cart.find((item) => item.gameId === gameId);
  if (existingItem) { existingItem.quantity += 1; } else { appState.cart.push({ gameId, quantity: 1 }); }
}

function renderCartSummary() {
  let totalItems = 0;
  let subtotal = 0;
  appState.cart.forEach((item) => {
    const game = gameList.find((g) => g.id === item.gameId);
    if (!game) return;
    totalItems += item.quantity;
    subtotal += game.price * item.quantity;
  });
  elements.summaryItems.textContent = String(totalItems);
  elements.summarySubtotal.textContent = toPriceText(subtotal);
  elements.summaryTotal.textContent = toPriceText(subtotal);
}

function changeCartItemQuantity(gameId, delta) {
  const item = appState.cart.find((cartItem) => cartItem.gameId === gameId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) { appState.cart = appState.cart.filter((cartItem) => cartItem.gameId !== gameId); }
}

function canDecreaseQuantity(item) {
  return item.quantity > 1;
}
