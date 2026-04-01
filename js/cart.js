import { appState } from "./state.js";

export function addGameToCart(gameId) {
  const existingItem = appState.cart.find(item => item.gameId === gameId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cart.push({ gameId, quantity: 1 });
  }
}

export function deleteCartItem(gameId) {
  appState.cart = appState.cart.filter(item => item.gameId !== gameId);
}