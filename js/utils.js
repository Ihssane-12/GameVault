export function toPriceText(value) {
  return '$' + value.toFixed(2);
}

export function normalizeQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity < 1) return 1;
  return Math.floor(quantity);
}

export function formatRating(value) {
  return Number(value).toFixed(1);
}