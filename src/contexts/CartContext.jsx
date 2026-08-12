import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import { products } from "../data/products";

import useLocalStorage from "../hooks/useLocalStorage";

import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
} from "../utils/constants";
import { STORAGE_KEYS } from "../utils/storageKeys";

const CartContext = createContext(null);

// مدیریت تمام منطق سبد خرید:
// - نگهداری اقلام سبد
// - همگام‌سازی با LocalStorage
// - محاسبه جمع قیمت و هزینه ارسال
// - ارائه API سبد خرید به کل برنامه
export function CartProvider({ children }) {
  // سبد خرید داخل LocalStorage ذخیره می‌شود تا بعد از بستن مرورگر از بین نرود.
  const [cartItems, setCartItems] = useLocalStorage(STORAGE_KEYS.CART, []);

  // افزودن محصول به سبد خرید.
  // اگر محصول قبلاً وجود داشته باشد، فقط تعداد آن افزایش پیدا می‌کند.
  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (!product?.availability) {
        return {
          success: false,
          message: "این محصول در حال حاضر ناموجود است.",
        };
      }

      // جلوگیری از ثبت تعداد نامعتبر (کمتر از ۱ یا مقدار غیرعددی)
      const safeQuantity = Math.max(1, Number(quantity) || 1);

      setCartItems((previousItems) => {
        // بررسی می‌کنیم آیا این محصول قبلاً در سبد خرید وجود دارد یا خیر.
        const existing = previousItems.find(
          (item) => item.productId === product.id,
        );

        if (existing) {
          // اگر محصول وجود داشت، فقط تعداد آن را افزایش می‌دهیم.
          return previousItems.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: item.quantity + safeQuantity,
                }
              : item,
          );
        }

        // محصول برای اولین بار به سبد خرید اضافه می‌شود.
        return [
          ...previousItems,
          {
            productId: product.id,
            quantity: safeQuantity,
          },
        ];
      });

      return {
        success: true,
        message: "محصول با موفقیت به سبد خرید اضافه شد.",
      };
    },
    [setCartItems],
  );

  const removeFromCart = useCallback(
    (productId) => {
      setCartItems((items) =>
        items.filter((item) => item.productId !== productId),
      );
    },
    [setCartItems],
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      const nextQuantity = Number(quantity) || 0;

      setCartItems((items) =>
        nextQuantity <= 0
          ? items.filter((item) => item.productId !== productId)
          : items.map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity: nextQuantity,
                  }
                : item,
            ),
      );
    },
    [setCartItems],
  );

  const increaseQuantity = useCallback(
    (productId) => {
      setCartItems((items) =>
        items.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    },
    [setCartItems],
  );

  // اگر تعداد به ۱ برسد، محصول به جای رسیدن به صفر از سبد حذف می‌شود.
  const decreaseQuantity = useCallback(
    (productId) => {
      setCartItems((items) =>
        // flatMap به ما اجازه می‌دهد در صورت نیاز آیتم را حذف کنیم.
        items.flatMap((item) => {
          if (item.productId !== productId) {
            return [item];
          }

          if (item.quantity <= 1) {
            return [];
          }

          return [
            {
              ...item,
              quantity: item.quantity - 1,
            },
          ];
        }),
      );
    },
    [setCartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const isInCart = useCallback(
    (productId) => cartItems.some((item) => item.productId === productId),
    [cartItems],
  );

  const getCartItemQuantity = useCallback(
    (productId) =>
      cartItems.find((item) => item.productId === productId)?.quantity || 0,
    [cartItems],
  );

  // cartItems فقط شناسه محصول و تعداد را نگه می‌دارد.
  // در اینجا اطلاعات کامل محصول از products.js استخراج می‌شود.
  const cartDetails = useMemo(
    () =>
      cartItems
        .map((item) => {
          // پیدا کردن اطلاعات کامل محصول با استفاده از شناسه
          const product = products.find(
            (candidate) => candidate.id === item.productId,
          );

          if (!product) {return null;}

          return {
            ...product,
            quantity: item.quantity,
            // قیمت کل این ردیف از سبد خرید
            lineTotal: product.price * item.quantity,
          };
        })
        .filter(Boolean),
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.quantity, 0),
    [cartDetails],
  );

  const subtotal = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartDetails],
  );

  // اگر مبلغ خرید از حد مشخص بیشتر باشد، ارسال رایگان است.
  const shippingCost = useMemo(
    () =>
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING_COST,
    [subtotal],
  );

  const discountAmount = 0;
  const totalPrice = subtotal + shippingCost - discountAmount;

  const value = useMemo(
    () => ({
      cartItems,
      cartDetails,
      totalItems,
      subtotal,
      shippingCost,
      discountAmount,
      totalPrice,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
      isInCart,
      getCartItemQuantity,
    }),
    [
      cartItems,
      cartDetails,
      totalItems,
      subtotal,
      shippingCost,
      discountAmount,
      totalPrice,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
      isInCart,
      getCartItemQuantity,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart باید داخل CartProvider استفاده شود.");
  }

  return context;
}
