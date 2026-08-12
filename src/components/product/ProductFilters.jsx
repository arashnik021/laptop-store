import { brands } from "../../data/brands";
import { categories } from "../../data/categories";

import ActionButton from "../common/ActionButton";

function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
  lockCategory,
}) {
  const toggleArray = (key, value) => {
    const current = filters[key] || [];

    const nextValue = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    onFilterChange(key, nextValue);
  };

  return (
    <aside
      className="filters-sidebar"
      aria-label="فیلتر محصولات"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="h6 fw-bold mb-0">
          فیلترها
        </h2>

        <button
          type="button"
          className="btn btn-link btn-sm p-0"
          onClick={onClearFilters}
        >
          پاک کردن
        </button>
      </div>

      {!lockCategory && (
        <div className="filter-group">
          <h3 className="filter-group__title">
            دسته‌بندی
          </h3>

          {categories.map((category) => {
            const inputId = `category-${category.slug}`;

            return (
              <div
                key={category.slug}
                className="form-check mb-2"
              >
                <input
                  id={inputId}
                  className="form-check-input"
                  type="checkbox"
                  checked={filters.selectedCategories.includes(
                    category.slug
                  )}
                  onChange={() =>
                    toggleArray("selectedCategories", category.slug)
                  }
                />

                <label
                  className="form-check-label small"
                  htmlFor={inputId}
                >
                  {category.title}
                </label>
              </div>
            );
          })}
        </div>
      )}

      <div className="filter-group">
        <h3 className="filter-group__title">
          برند
        </h3>

        {brands.map((brand) => {
          const inputId = `brand-${brand.slug}`;

          return (
            <div
              key={brand.slug}
              className="form-check mb-2"
            >
              <input
                id={inputId}
                className="form-check-input"
                type="checkbox"
                checked={filters.selectedBrands.includes(brand.name)}
                onChange={() =>
                  toggleArray("selectedBrands", brand.name)
                }
              />

              <label
                className="form-check-label small"
                htmlFor={inputId}
              >
                {brand.title}
              </label>
            </div>
          );
        })}
      </div>

      <div className="filter-group">
        <h3 className="filter-group__title">
          بازه قیمت (تومان)
        </h3>

        <div className="d-grid gap-2">
          <input
            className="form-control form-control-sm"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(event) =>
              onFilterChange("minPrice", event.target.value)
            }
            placeholder="حداقل قیمت"
          />

          <input
            className="form-control form-control-sm"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(event) =>
              onFilterChange("maxPrice", event.target.value)
            }
            placeholder="حداکثر قیمت"
          />
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-group__title">
          حداقل امتیاز
        </h3>

        <select
          className="form-select form-select-sm"
          value={filters.minRating}
          onChange={(event) =>
            onFilterChange("minRating", Number(event.target.value))
          }
        >
          <option value="0">همه امتیازها</option>
          <option value="4">۴ و بالاتر</option>
          <option value="4.5">۴.۵ و بالاتر</option>
        </select>

        <div className="form-check mt-3">
          <input
            id="available-only"
            className="form-check-input"
            type="checkbox"
            checked={filters.onlyAvailable}
            onChange={(event) =>
              onFilterChange("onlyAvailable", event.target.checked)
            }
          />

          <label
            className="form-check-label small"
            htmlFor="available-only"
          >
            فقط محصولات موجود
          </label>
        </div>
      </div>

      <ActionButton
        className="w-100 mt-4"
        variant="outline"
        onClick={onClearFilters}
      >
        پاک کردن همه فیلترها
      </ActionButton>
    </aside>
  );
}

export default ProductFilters;
