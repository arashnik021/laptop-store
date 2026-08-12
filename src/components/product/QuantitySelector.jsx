function QuantitySelector({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = Infinity,
  disabled = false,
  ariaLabel = "انتخاب تعداد",
}) {
  const safeQuantity = Math.max(min, Number(quantity) || min);

  const isDecreaseDisabled = disabled || safeQuantity <= min;
  const isIncreaseDisabled = disabled || safeQuantity >= max;

  return (
    <div
      className="quantity-selector"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="quantity-selector__button"
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
        aria-label="افزایش تعداد"
        title="افزایش تعداد"
      >
        <i className="bi bi-plus-lg" aria-hidden="true" />
      </button>

      <span
        className="quantity-selector__value"
        aria-live="polite"
        aria-atomic="true"
      >
        {safeQuantity}
      </span>

      <button
        type="button"
        className="quantity-selector__button"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        aria-label="کاهش تعداد"
        title="کاهش تعداد"
      >
        <i className="bi bi-dash-lg" aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantitySelector;
