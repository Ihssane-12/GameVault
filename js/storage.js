import { appState } from "./state.js";

const CART_STORAGE_KEY = 'gamevault_cart_v1';

export function saveCartToStorage() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(appState.cart));
}

export function loadCartFromStorage() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) appState.cart = parsed;
  } catch (_) {}
}