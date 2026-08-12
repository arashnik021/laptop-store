export function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(Number(price) || 0);
}

export function formatToman(price) {
  return `${formatPrice(price)} تومان`;
}
