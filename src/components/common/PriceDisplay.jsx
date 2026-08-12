import { formatPrice } from "../../utils/formatPrice";

function PriceDisplay({
  price,
  oldPrice,
  showDiscount = true,
  className = "",
}) {
  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const hasDiscount = discount > 0;

  return (
    <div className={`price-display ${className}`}>
      <span className="price-display__current">
        {formatPrice(price)} تومان
      </span>

      {hasDiscount && (
        <>
          <span className="price-display__old">
            {formatPrice(oldPrice)} تومان
          </span>

          {showDiscount && (
            <span className="price-display__discount">
              {discount}٪
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default PriceDisplay;
