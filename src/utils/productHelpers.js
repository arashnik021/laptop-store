import { products } from "../data/products";

export const getProductById = (id) =>
  products.find((item) => item.id === Number(id));

export const getProductsByCategory = (slug) =>
  products.filter((item) => item.category === slug);

export const getProductsByBrand = (brand) =>
  products.filter((item) => item.brand === brand);

export const getDiscountedProducts = () =>
  products.filter(
    (item) => item.oldPrice && item.oldPrice > item.price
  );

export const getNewProducts = () =>
  products.filter((item) => item.isNew);

export const getBestSellerProducts = () =>
  products
    .filter((item) => item.isBestSeller)
    .sort((a, b) => a.salesRank - b.salesRank);

export function getRelatedProducts(productId, limit = 6) {
  const current = getProductById(productId);

  if (!current) {
    return [];
  }

  return products
    .filter((item) => item.id !== current.id)
    .sort((a, b) => {
      const aScore =
        (a.category === current.category ? 2 : 0) +
        (a.brand === current.brand ? 1 : 0) +
        a.rating / 10;

      const bScore =
        (b.category === current.category ? 2 : 0) +
        (b.brand === current.brand ? 1 : 0) +
        b.rating / 10;

      return bScore - aScore;
    })
    .slice(0, limit);
}

export function filterProducts(items, filters) {
  const search =
    filters.searchTerm?.trim().toLocaleLowerCase("fa-IR") || "";

  return items.filter((item) => {
    const searchable = `
      ${item.name}
      ${item.model}
      ${item.brand}
      ${item.description}
    `.toLocaleLowerCase("fa-IR");

    const matchesSearch =
      !search || searchable.includes(search);

    const matchesBrand =
      !filters.selectedBrands?.length ||
      filters.selectedBrands.includes(item.brand);

    const matchesCategory =
      !filters.selectedCategories?.length ||
      filters.selectedCategories.includes(item.category);

    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Infinity;

    const matchesPrice =
      item.price >= minPrice && item.price <= maxPrice;

    const matchesRating =
      item.rating >= (Number(filters.minRating) || 0);

    const matchesAvailability =
      !filters.onlyAvailable || item.availability;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesAvailability
    );
  });
}

export function sortProducts(items, sortBy) {
  const sorted = [...items];

  if (sortBy === "price-low") {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high") {
    return sorted.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    return sorted.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === "best-selling") {
    return sorted.sort((a, b) => a.salesRank - b.salesRank);
  }

  if (sortBy === "newest") {
    return sorted.sort(
      (a, b) => Number(b.isNew) - Number(a.isNew) || a.id - b.id
    );
  }

  return sorted;
}
