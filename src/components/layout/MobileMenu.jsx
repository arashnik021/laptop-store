import { Link, NavLink } from "react-router-dom";

import { categories } from "../../data/categories";
import { mainNavigation } from "../../data/navigation";

import { useAuth } from "../../contexts/AuthContext";

function MobileMenu({ isOpen, onClose }) {
  const { currentUser } = useAuth();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="mobile-backdrop"
        aria-label="بستن منو"
        onClick={onClose}
      />

      <aside
        className="mobile-panel is-open"
        aria-label="منوی موبایل"
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link
            className="site-logo"
            to="/"
            onClick={onClose}
          >
            <span className="site-logo__mark">
              <i className="bi bi-laptop" />
            </span>
            Laptop Store
          </Link>

          <button
            type="button"
            className="nav-icon-button"
            onClick={onClose}
            aria-label="بستن منو"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav aria-label="ناوبری موبایل">
          <ul className="d-grid gap-1">
            {mainNavigation.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `nav-link-custom d-block ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <hr />

        <h2 className="h6 fw-bold">
          دسته‌بندی‌ها
        </h2>

        <div className="d-grid gap-1">
          {categories.map((category) => {
            const categoryUrl = `/categories/${category.slug}`;

            return (
              <Link
                key={category.id}
                className="nav-link-custom"
                to={categoryUrl}
                onClick={onClose}
              >
                <i className={`bi ${category.icon} ms-2`} />
                {category.title}
              </Link>
            );
          })}
        </div>

        <hr />

        <div className="d-grid gap-2">
          {currentUser ? (
            <Link
              to="/profile"
              onClick={onClose}
              className="action-button action-button--primary"
            >
              پروفایل کاربری
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="action-button action-button--outline"
              >
                ورود
              </Link>

              <Link
                to="/register"
                onClick={onClose}
                className="action-button action-button--primary"
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;
