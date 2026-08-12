import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useLocation,
  useSearchParams,
} from "react-router-dom";

import ActionButton from "../components/common/ActionButton";
import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/common/PageHeader";
import Pagination from "../components/common/Pagination";

import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import SearchBar from "../components/product/SearchBar";
import SortSelect from "../components/product/SortSelect";

import { products } from "../data/products";

import useDocumentTitle from "../hooks/useDocumentTitle";

import { PRODUCTS_PER_PAGE } from "../utils/constants";
import {
  filterProducts,
  sortProducts,
} from "../utils/productHelpers";

const initialFilters = {
  searchTerm: "",
  selectedBrands: [],
  selectedCategories: [],
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  onlyAvailable: false,
  sortBy: "default",
};

function ProductsPage() {
  useDocumentTitle("محصولات");

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialBrand = searchParams.get("brand");

  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    searchTerm: location.state?.initialSearch || "",
    selectedBrands: initialBrand ? [initialBrand] : [],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    if (location.state?.initialSearch) {
      setFilters((data) => ({
        ...data,
        searchTerm: location.state.initialSearch,
      }));
    }
  }, [location.state]);

  const filtered = useMemo(
    () =>
      sortProducts(
        filterProducts(products, filters),
        filters.sortBy
      ),
    [filters]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  );

  const visible = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const change = (key, value) => {
    setFilters((data) => ({
      ...data,
      [key]: value,
    }));

    setCurrentPage(1);
  };

  const clear = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const active = [];

  if (filters.searchTerm) {
    active.push([
      "searchTerm",
      `جست‌وجو: ${filters.searchTerm}`,
    ]);
  }

  filters.selectedBrands.forEach((value) => {
    active.push([
      `brand-${value}`,
      `برند: ${value}`,
    ]);
  });

  filters.selectedCategories.forEach((value) => {
    active.push([
      `category-${value}`,
      `دسته: ${value}`,
    ]);
  });

  if (filters.onlyAvailable) {
    active.push([
      "availability",
      "فقط موجودها",
    ]);
  }

  if (filters.minRating) {
    active.push([
      "rating",
      `امتیاز ${filters.minRating}+`,
    ]);
  }

  const removeActiveFilter = (key) => {
    if (key === "searchTerm") {
      change("searchTerm", "");
    } else if (key.startsWith("brand-")) {
      change(
        "selectedBrands",
        filters.selectedBrands.filter(
          (item) => item !== key.replace("brand-", "")
        )
      );
    } else if (key.startsWith("category-")) {
      change(
        "selectedCategories",
        filters.selectedCategories.filter(
          (item) => item !== key.replace("category-", "")
        )
      );
    } else if (key === "availability") {
      change("onlyAvailable", false);
    } else {
      change("minRating", 0);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 220,
      behavior: "smooth",
    });
  };

  return (
    <div className="app-container page-content">
      <Breadcrumb
        items={[
          {
            label: "خانه",
            path: "/",
          },
          {
            label: "محصولات",
          },
        ]}
      />

      <PageHeader
        title="همه لپ‌تاپ‌ها"
        description="مدل موردنظر خود را جست‌وجو، فیلتر و مقایسه کنید."
      />

      <SearchBar
        value={filters.searchTerm}
        onChange={(value) =>
          change("searchTerm", value)
        }
        onSubmit={(event) =>
          event.preventDefault()
        }
      />

      <div className="products-toolbar">
        <span className="text-muted small">
          {filtered.length} محصول پیدا شد
        </span>

        <div className="d-flex align-items-center gap-2">
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
            onClick={() => setMobileFilters(true)}
            icon={<i className="bi bi-sliders" />}
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
          />
        </div>

        <div>
          {active.length > 0 && (
            <div className="active-filters">
              {active.map(([key, label]) => (
                <span
                  key={key}
                  className="active-filter"
                >
                  {label}

                  <button
                    className="border-0 bg-transparent p-0 text-primary"
                    onClick={() => removeActiveFilter(key)}
                    aria-label={`حذف ${label}`}
                  >
                    <i className="bi bi-x" />
                  </button>
                </span>
              ))}

              <button
                className="btn btn-link btn-sm p-0"
                onClick={clear}
              >
                حذف همه
              </button>
            </div>
          )}

          <ProductGrid
            products={visible}
            emptyTitle="محصولی مطابق انتخاب شما پیدا نشد"
            emptyDescription="فیلترها یا عبارت جست‌وجوی خود را تغییر دهید."
          />

          {filtered.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {mobileFilters && (
        <>
          <button
            className="mobile-backdrop"
            aria-label="بستن فیلترها"
            onClick={() => setMobileFilters(false)}
          />

          <aside
            className="mobile-panel is-open"
            aria-label="فیلتر محصولات"
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h5 fw-bold mb-0">
                فیلتر محصولات
              </h2>

              <button
                className="nav-icon-button"
                onClick={() => setMobileFilters(false)}
                aria-label="بستن فیلترها"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={change}
              onClearFilters={clear}
            />
          </aside>
        </>
      )}
    </div>
  );
}

export default ProductsPage;