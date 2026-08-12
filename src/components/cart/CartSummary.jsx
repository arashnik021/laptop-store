import ActionButton from "../common/ActionButton";

import { formatPrice } from "../../utils/formatPrice";

function CartSummary({
  subtotal,
  shippingCost,
  discountAmount,
  totalPrice,
  itemCount,
  onCheckout,
}) {
  const formattedSubtotal = formatPrice(subtotal);
  const formattedShipping = formatPrice(shippingCost);
  const formattedDiscount = formatPrice(discountAmount);
  const formattedTotal = formatPrice(totalPrice);

  const shippingLabel = shippingCost
    ? `${formattedShipping} تومان`
    : "رایگان";

  return (
    <aside className="cart-summary">
      <h2 className="h5 fw-bold mb-3">
        خلاصه سفارش
      </h2>

      <div className="summary-row">
        <span>تعداد کالا</span>
        <span>{itemCount} کالا</span>
      </div>

      <div className="summary-row">
        <span>جمع کالاها</span>
        <span>{formattedSubtotal} تومان</span>
      </div>

      <div className="summary-row">
        <span>هزینه ارسال</span>
        <span>{shippingLabel}</span>
      </div>

      {discountAmount > 0 && (
        <div className="summary-row">
          <span>تخفیف</span>

          <span className="text-success">
            -{formattedDiscount} تومان
          </span>
        </div>
      )}

      <div className="summary-row summary-row--total">
        <span>مبلغ نهایی</span>
        <span>{formattedTotal} تومان</span>
      </div>

      <ActionButton
        className="w-100 mt-4"
        onClick={onCheckout}
        icon={<i className="bi bi-credit-card" />}
      >
        ثبت نهایی سفارش
      </ActionButton>

      <p className="small text-muted mt-3 mb-0">
        ثبت سفارش در این نسخه آموزشی، صرفاً نمایشی است.
      </p>
    </aside>
  );
}

export default CartSummary;
