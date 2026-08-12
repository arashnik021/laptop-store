import { Link } from "react-router-dom";

import { brands } from "../../data/brands";
import { categories } from "../../data/categories";

function MegaMenu({ onClose }) {
  return (
    <div
      className="mega-menu"
      role="menu"
      aria-label="دسته‌بندی‌ها و برندها"
    >
      <div className="row g-4">
        <div className="col-md-7">
          <h3 className="h6 fw-bold mb-3">
            دسته‌بندی‌های لپ‌تاپ
          </h3>

          <div className="row row-cols-2 g-2">
            {categories.map((category) => {
              const categoryUrl = `/categories/${category.slug}`;

              return (
                <div
                  key={category.id}
                  className="col"
                >
                  <Link
                    className="mega-menu__link"
                    to={categoryUrl}
                    onClick={onClose}
                  >
                    <i className={`bi ${category.icon}`} />
                    <span>{category.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-md-5 border-end-md">
          <h3 className="h6 fw-bold mb-3">
            برندهای محبوب
          </h3>

          <div className="d-flex flex-wrap gap-2">
            {brands.map((brand) => {
              const brandUrl = {
                pathname: "/products",
                search: `?brand=${encodeURIComponent(brand.name)}`,
              };

              return (
                <Link
                  key={brand.id}
                  className="badge text-bg-light border p-2"
                  to={brandUrl}
                  onClick={onClose}
                >
                  {brand.title}
                </Link>
              );
            })}
          </div>

          <Link
            className="action-button action-button--primary action-button--sm mt-4"
            to="/products"
            onClick={onClose}
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
