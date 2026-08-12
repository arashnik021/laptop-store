import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";

import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

import useDocumentTitle from "../hooks/useDocumentTitle";

function CartPage() {
  useDocumentTitle("سبد خرید");

  const {
    cartDetails,
    totalItems,
    subtotal,
    shippingCost,
    discountAmount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const { showToast } = useToast();

  const breadcrumbItems = [
    {
      label: "خانه",
      path: "/",
    },
    {
      label: "سبد خرید",
    },
  ];

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    showToast("محصول از سبد خرید حذف شد.", "info");
  };

  const handleCheckout = () => {
    showToast(
      "ثبت نهایی سفارش در نسخه نمایشی Front-End فعال نیست.",
      "info",
      5000
    );
  };

  if (!cartDetails.length) {
    return (
      <div className="app-container page-content">
        <Breadcrumb items={breadcrumbItems} />

        <PageHeader
          title="سبد خرید"
          description="محصولات انتخاب‌شده خود را بررسی و مدیریت کنید."
        />

        <EmptyState
          icon="bi-cart-x"
          title="سبد خرید شما خالی است"
          description="برای مشاهده و انتخاب لپ‌تاپ‌های مناسب، محصولات فروشگاه را بررسی کنید."
          actionText="مشاهده محصولات"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="app-container page-content">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="سبد خرید"
        description={`${totalItems} کالا در سبد خرید شما قرار دارد.`}
      />

      <div className="cart-layout">
        <div className="d-grid gap-3">
          {cartDetails.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={handleRemoveFromCart}
            />
          ))}
        </div>

        <CartSummary
          subtotal={subtotal}
          shippingCost={shippingCost}
          discountAmount={discountAmount}
          totalPrice={totalPrice}
          itemCount={totalItems}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}

export default CartPage;
