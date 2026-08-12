import { Link } from "react-router-dom";

import ActionButton from "../common/ActionButton";
import PriceDisplay from "../common/PriceDisplay";
import RatingStars from "../common/RatingStars";
import StatusBadge from "../common/StatusBadge";

import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { useWishlist } from "../../contexts/WishlistContext";

function ProductCard({
  product,
  showActions = true,
}) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const wished = isInWishlist(product.id);

  const productUrl = `/products/${product.id}`;
  const isAvailable = product.availability;
  const hasDiscount = Boolean(product.oldPrice);

  const handleAddToCart = () => {
    const result = addToCart(product);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );
  };

  const handleToggleWishlist = () => {
    const result = toggleWishlist(product.id);

    showToast(
      result.message,
      result.action === "removed"
        ? "info"
        : "success"
    );
  };

  return (
    <article className="product-card">
      <div className="product-card__image">
        <Link
          to={productUrl}
          aria-label={`مشاهده ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
          />
        </Link>

        {hasDiscount && (
          <StatusBadge
            className="product-card__badge"
            variant="discount"
          >
            تخفیف ویژه
          </StatusBadge>
        )}

        <button
          type="button"
          className={`product-card__wishlist ${
            wished ? "is-active" : ""
          }`}
          onClick={handleToggleWishlist}
          aria-label={
            wished
              ? "حذف از علاقه‌مندی‌ها"
              : "افزودن به علاقه‌مندی‌ها"
          }
          aria-pressed={wished}
        >
          <i
            className={`bi ${
              wished
                ? "bi-heart-fill"
                : "bi-heart"
            }`}
          />
        </button>
      </div>

      <div className="product-card__body">
        <span className="product-card__brand">
          {product.brand}
        </span>

        <Link
          className="product-card__title"
          to={productUrl}
        >
          {product.name}
        </Link>

        <div className="product-card__specs">
          {product.tags
            .slice(0, 3)
            .map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
        </div>

        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        <div className="product-card__footer">
          <PriceDisplay
            price={product.price}
            oldPrice={product.oldPrice}
          />

          <span
            className={`product-card__availability ${
              !isAvailable
                ? "is-unavailable"
                : ""
            }`}
          >
            <i
              className={`bi ${
                isAvailable
                  ? "bi-check-circle"
                  : "bi-x-circle"
              }`}
            />

            {isAvailable
              ? "موجود در انبار"
              : "ناموجود"}
          </span>

          {showActions && (
            <ActionButton
              size="sm"
              disabled={!isAvailable}
              onClick={handleAddToCart}
              icon={<i className="bi bi-cart-plus" />}
            >
              {isAvailable
                ? "افزودن به سبد"
                : "ناموجود"}
            </ActionButton>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
