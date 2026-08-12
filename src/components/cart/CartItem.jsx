import { Link } from "react-router-dom";

import PriceDisplay from "../common/PriceDisplay";
import QuantitySelector from "../product/QuantitySelector";

const FALLBACK_IMAGE = "/images/placeholder.svg";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { id, name = "محصول بدون نام", brand = "برند نامشخص", images = [], specs = {}, oldPrice }
  = item;

  const price = Number(item.price) || 0;
  const quantity = Math.max(1, Number(item.quantity) || 1);

  const productUrl = `/products/${id}`;
  const productImage = images[0] || FALLBACK_IMAGE;

  const cpu = specs.cpu || "پردازنده نامشخص";
  const ram = specs.ram || "رم نامشخص";
  const totalPrice = price * quantity;

  const handleIncrease = () => {onIncrease(id)};

  const handleDecrease = () => {
    if (quantity > 1) {onDecrease(id)}
  };

  const handleRemove = () => {onRemove(id)};

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <article className="cart-item" aria-label={`محصول ${name} در سبد خرید`}>
      <Link
        className="cart-item__image"
        to={productUrl}
        aria-label={`مشاهده جزئیات ${name}`}
      >
        <img
          src={productImage}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
      </Link>

      <div className="cart-item__content">
        <div className="cart-item__header">
          <Link
            to={productUrl}
            className="h6 fw-bold d-block mb-1"
            aria-label={`مشاهده جزئیات ${name}`}
          >
            {name}
          </Link>

          <button
            type="button"
            className="btn btn-link text-danger p-0 cart-item__remove-mobile"
            onClick={handleRemove}
            aria-label={`حذف ${name} از سبد خرید`}
            title="حذف از سبد خرید"
          >
            <i className="bi bi-trash3" aria-hidden="true" />
          </button>
        </div>

        <p className="small text-muted mb-2">
          {brand} <span aria-hidden="true">•</span> {cpu}{" "}
          <span aria-hidden="true">•</span> {ram}
        </p>

        <div className="cart-item__price">
          <PriceDisplay price={price} oldPrice={oldPrice} />
        </div>

        <div className="cart-item__total small fw-semibold mt-2">
          <span>جمع این محصول: </span>
          <PriceDisplay price={totalPrice} />
        </div>

        <div className="cart-item__actions mt-3">
          <div className="cart-item__quantity">
            <span className="visually-hidden" aria-live="polite">
              تعداد {name}: {quantity}
            </span>

            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              disableDecrease={quantity <= 1}
              ariaLabel={`تغییر تعداد ${name}`}
            />
          </div>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm cart-item__remove"
            onClick={handleRemove}
            aria-label={`حذف ${name} از سبد خرید`}
          >
            <i className="bi bi-trash3 ms-1" aria-hidden="true" />
            حذف
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
