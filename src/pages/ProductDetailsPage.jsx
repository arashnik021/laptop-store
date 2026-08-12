import { useState } from "react";
import { useParams } from "react-router-dom";

import ActionButton from "../components/common/ActionButton";
import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import PriceDisplay from "../components/common/PriceDisplay";
import RatingStars from "../components/common/RatingStars";
import StatusBadge from "../components/common/StatusBadge";

import ProductGallery from "../components/product/ProductGallery";
import ProductSpecs from "../components/product/ProductSpecs";
import QuantitySelector from "../components/product/QuantitySelector";

import ProductSection from "../components/home/ProductSection";

import useDocumentTitle from "../hooks/useDocumentTitle";

import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { useWishlist } from "../contexts/WishlistContext";

import { categories } from "../data/categories";
import { getProductById, getRelatedProducts } from "../utils/productHelpers";

function ProductDetailsPage() {
  const { id } = useParams();

  const product = getProductById(id);

  useDocumentTitle(
    product ? product.name : "محصول پیدا نشد"
  );

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="app-container page-content">
        <EmptyState
          icon="bi-box-seam"
          title="محصول موردنظر پیدا نشد"
          description="ممکن است آدرس واردشده نادرست باشد یا محصول در داده فروشگاه وجود نداشته باشد."
          actionText="بازگشت به محصولات"
          actionTo="/products"
        />
      </div>
    );
  }

  const category = categories.find(
    (item) => item.slug === product.category
  );

  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    const result = addToCart(product, quantity);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );
  };

  const handleToggleWishlist = () => {
    const result = toggleWishlist(product.id);

    showToast(
      result.message,
      result.action === "removed" ? "info" : "success"
    );
  };

  return (
    <>
      <div className="app-container page-content">
        <Breadcrumb
          items={[
            { label: "خانه", path: "/" },
            { label: "محصولات", path: "/products" },
            {
              label: category?.title,
              path: `/categories/${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <div className="product-details-grid">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          <div className="product-info">
            <span className="product-info__brand">
              {product.brand} • {product.model}
            </span>

            <h1 className="product-info__title">
              {product.name}
            </h1>

            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            <div className="mt-3">
              {product.availability ? (
                <StatusBadge
                  variant="success"
                  icon={
                    <i className="bi bi-check-circle" />
                  }
                >
                  موجود در انبار
                </StatusBadge>
              ) : (
                <StatusBadge
                  variant="danger"
                  icon={
                    <i className="bi bi-x-circle" />
                  }
                >
                  ناموجود
                </StatusBadge>
              )}
            </div>

            <p className="product-info__description">
              {product.description}
            </p>

            <ProductSpecs
              specs={product.specs}
              variant="compact"
              title="مشخصات کلیدی"
            />

            <div className="purchase-card">
              <PriceDisplay
                price={product.price}
                oldPrice={product.oldPrice}
              />

              <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
                <span className="small text-muted">
                  تعداد:
                </span>

                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() =>
                    setQuantity((v) => v + 1)
                  }
                  onDecrease={() =>
                    setQuantity((v) =>
                      Math.max(1, v - 1)
                    )
                  }
                  disabled={!product.availability}
                />
              </div>

              <div className="purchase-card__actions">
                <ActionButton
                  disabled={!product.availability}
                  onClick={handleAddToCart}
                  icon={
                    <i className="bi bi-cart-plus" />
                  }
                >
                  {product.availability
                    ? "افزودن به سبد خرید"
                    : "محصول ناموجود است"}
                </ActionButton>

                <ActionButton
                  variant={wished ? "danger" : "outline"}
                  onClick={handleToggleWishlist}
                  icon={
                    <i
                      className={`bi ${
                        wished
                          ? "bi-heart-fill"
                          : "bi-heart"
                      }`}
                    />
                  }
                >
                  {wished
                    ? "حذف از علاقه‌مندی"
                    : "افزودن به علاقه‌مندی"}
                </ActionButton>
              </div>
            </div>
          </div>
        </div>

        <section className="section">
          <ProductSpecs specs={product.specs} />
        </section>

        <section className="section section--soft">
          <div className="app-container">
            <h2 className="h4 fw-bold mb-4">
              مزایای خرید از نسخه نمایشی فروشگاه
            </h2>

            <div className="benefit-grid">
              <div className="info-card">
                <i className="bi bi-shield-check" />
                <h3>اطلاعات شفاف</h3>
                <p>
                  مشخصات فنی محصول در ساختاری خوانا
                  نمایش داده می‌شود.
                </p>
              </div>

              <div className="info-card">
                <i className="bi bi-truck" />
                <h3>ارسال نمایشی</h3>
                <p>
                  هزینه ارسال براساس مبلغ سبد خرید
                  محاسبه می‌شود.
                </p>
              </div>

              <div className="info-card">
                <i className="bi bi-heart" />
                <h3>ذخیره برای بعد</h3>
                <p>
                  محصولات منتخب شما در علاقه‌مندی‌ها
                  نگهداری می‌شوند.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ProductSection
        title="محصولات مرتبط"
        subtitle="مدل‌های نزدیک از نظر دسته، برند و امتیاز"
        products={getRelatedProducts(product.id)}
        variant="slider"
      />
    </>
  );
}

export default ProductDetailsPage;
