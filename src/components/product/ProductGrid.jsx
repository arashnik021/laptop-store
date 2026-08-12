import EmptyState from "../common/EmptyState";
import LoadingSkeleton from "../common/LoadingSkeleton";

import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  isLoading = false,
  emptyTitle = "محصولی پیدا نشد",
  emptyDescription = "نتیجه‌ای مطابق انتخاب شما وجود ندارد.",
}) {
  if (isLoading) {
    return <LoadingSkeleton count={8} />;
  }

  if (!products.length) {
    return (
      <EmptyState
        icon="bi-search"
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
