import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ActionButton from "../components/common/ActionButton";
import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import Pagination from "../components/common/Pagination";

import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import SortSelect from "../components/product/SortSelect";

import { categories } from "../data/categories";
import { products } from "../data/products";

import useDocumentTitle from "../hooks/useDocumentTitle";

import { PRODUCTS_PER_PAGE } from "../utils/constants";
import {
  filterProducts,
  sortProducts,
} from "../utils/productHelpers";

function CategoryProductsPage() {
  const { slug } = useParams();

  const category = categories.find(
    (item) => item.slug === slug
  );

  useDocumentTitle(
    category ? category.title : "دسته‌بندی پیدا نشد"
  );

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedBrands: [],
    selectedCategories: category ? [category.slug] : [],
    minPrice: "",
    maxPrice: "",
    minRating: 0,
    onlyAvailable: false,
    sortBy: "default",
  });

  const [page, setPage] = useState(1);
  const [mobile, setMobile] = useState(false);

  const items = useMemo(
    () =>
      sortProducts(
        filterProducts(products, filters),
        filters.sortBy
      ),
    [filters]
  );

  const pages = Math.max(
    1,
    Math.ceil(items.length / PRODUCTS_PER_PAGE)
  );

  const visible = items.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const change = (key, value) => {
    setFilters((data) => ({
      ...data,
      [key]: value,
    }));

    setPage(1);
  };

  const clear = () => {
    setFilters({
      searchTerm: "",
      selectedBrands: [],
      selectedCategories: [category.slug],
      minPrice: "",
      maxPrice: "",
      minRating: 0,
      onlyAvailable: false,
      sortBy: "default",
    });

    setPage(1);
  };

  if (!category) {
    return (
      <div className="app-container page-content">
        <EmptyState
          icon="bi-folder-x"
          title="دسته‌بندی موردنظر پیدا نشد"
          description="مسیر واردشده معتبر نیست."
          actionText="مشاهده دسته‌بندی‌ها"
          actionTo="/categories"
        />
      </div>
    );
  }

  return (
    <div className="app-container page-content">
      <Breadcrumb
        items={[
          {
            label: "خانه",
            path: "/",
          },
          {
            label: "دسته‌بندی‌ها",
            path: "/categories",
          },
          {
            label: category.title,
          },
        ]}
      />

      <PageHeader
        title={category.title}
        description={category.description}
      />

      <div className="products-toolbar">
        <span className="text-muted small">
          {items.length} محصول در این دسته وجود دارد
        </span>

        <div className="d-flex gap-2">
          <SortSelect
            value={filters.sortBy}
            onChange={(value) =>
              change("sortBy", value)
            }
          />

          <ActionButton
            className="d-lg-none"
            size="sm"
            variant="outline"
            onClick={() => setMobile(true)}
          >
            فیلترها
          </ActionButton>
        </div>
      </div>

      <div className="products-layout">
        <div className="d-none d-lg-block">
          <ProductFilters
            filters={filters}
            onFilterChange={change}
            onClearFilters={clear}
            lockCategory
          />
        </div>

        <div>
          <ProductGrid
            products={visible}
            emptyTitle="محصولی در این دسته با این فیلترها پیدا نشد"
          />

          {items.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={pages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {mobile && (
        <>
          <button
            className="mobile-backdrop"
            onClick={() => setMobile(false)}
            aria-label="بستن فیلترها"
          />

          <aside className="mobile-panel is-open">
            <div className="d-flex justify-content-between mb-4">
              <h2 className="h5">
                فیلتر محصولات
              </h2>

              <button
                className="nav-icon-button"
                onClick={() => setMobile(false)}
                aria-label="بستن"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={change}
              onClearFilters={clear}
              lockCategory
            />
          </aside>
        </>
      )}
    </div>
  );
}

export default CategoryProductsPage;
