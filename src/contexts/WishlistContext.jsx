import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import { products } from "../data/products";

import useLocalStorage from "../hooks/useLocalStorage";

import { STORAGE_KEYS } from "../utils/storageKeys";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useLocalStorage(
    STORAGE_KEYS.WISHLIST,
    []
  );

  const isInWishlist = useCallback(
    (productId) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  const addToWishlist = useCallback(
    (productId) => {
      if (wishlistItems.includes(productId)) {
        return {
          action: "exists",
          message: "این محصول از قبل در علاقه‌مندی‌ها قرار دارد.",
        };
      }

      setWishlistItems((items) => [
        ...items,
        productId,
      ]);

      return {
        action: "added",
        message: "محصول به علاقه‌مندی‌ها اضافه شد.",
      };
    },
    [wishlistItems, setWishlistItems]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      setWishlistItems((items) =>
        items.filter((id) => id !== productId)
      );

      return {
        action: "removed",
        message: "محصول از علاقه‌مندی‌ها حذف شد.",
      };
    },
    [setWishlistItems]
  );

  const toggleWishlist = useCallback(
    (productId) =>
      isInWishlist(productId)
        ? removeFromWishlist(productId)
        : addToWishlist(productId),
    [
      isInWishlist,
      removeFromWishlist,
      addToWishlist,
    ]
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, [setWishlistItems]);

  const wishlistProducts = useMemo(
    () =>
      wishlistItems
        .map((id) =>
          products.find((item) => item.id === id)
        )
        .filter(Boolean),
    [wishlistItems]
  );

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistProducts,
      wishlistCount: wishlistItems.length,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
    }),
    [
      wishlistItems,
      wishlistProducts,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist باید داخل WishlistProvider استفاده شود."
    );
  }

  return context;
}
