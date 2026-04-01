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
