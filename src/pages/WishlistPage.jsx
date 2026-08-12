import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";

import ProductGrid from "../components/product/ProductGrid";

import { useWishlist } from "../contexts/WishlistContext";

import useDocumentTitle from "../hooks/useDocumentTitle";

function WishlistPage() {
  useDocumentTitle("علاقه‌مندی‌ها");

  const { wishlistProducts } = useWishlist();

  const breadcrumbItems = [
    {
      label: "خانه",
      path: "/",
    },
    {
      label: "علاقه‌مندی‌ها",
    },
  ];

  return (
    <div className="app-container page-content">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="علاقه‌مندی‌ها"
        description="محصولات ذخیره‌شده خود را برای بررسی و خرید بعدی مدیریت کنید."
      />

      {wishlistProducts.length ? (
        <ProductGrid
          products={wishlistProducts}
        />
      ) : (
        <EmptyState
          icon="bi-heart"
          title="هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید"
          description="محصولات موردعلاقه خود را برای بررسی و خرید بعدی ذخیره کنید."
          actionText="مشاهده محصولات"
          actionTo="/products"
        />
      )}
    </div>
  );
}

export default WishlistPage;
