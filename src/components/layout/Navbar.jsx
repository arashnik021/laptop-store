import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { mainNavigation } from "../../data/navigation";

import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { useWishlist } from "../../contexts/WishlistContext";

import useScrollPosition from "../../hooks/useScrollPosition";
import { STORAGE_KEYS } from "../../utils/storageKeys";

import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const navigate = useNavigate();
  const scrollY = useScrollPosition();

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, logout } = useAuth();
  const { showToast } = useToast();

  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem(STORAGE_KEYS.THEME) === "dark"
  );

  const isScrolled = scrollY > 12;
  const firstName = currentUser?.fullName.split(" ")[0];

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem(
      STORAGE_KEYS.THEME,
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const submitSearch = (event) => {
    event.preventDefault();

    const search = term.trim();

    navigate("/products", {
      state: {
        initialSearch: search,
      },
    });

    setTerm("");
  };

  const handleLogout = () => {
    const result = logout();

    showToast(result.message, "success");
    navigate("/");
  };

  const toggleMegaMenu = () => {
    setMenuOpen((value) => !value);
  };

  const closeMegaMenu = () => {
    setMenuOpen(false);
  };

  const openMobileMenu = () => {
    setMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((value) => !value);
  };

  return (
    <>
      <header
        className={`site-navbar ${
          isScrolled ? "site-navbar--scrolled" : ""
        }`}
      >
        <div className="app-container navbar-inner">
          <Link
            className="site-logo"
            to="/"
          >
            <span className="site-logo__mark">
              <i className="bi bi-laptop" />
            </span>

            <span>Laptop Store</span>
          </Link>

          <nav
            className="nav-links d-none d-lg-flex"
            aria-label="ناوبری اصلی"
          >
            {mainNavigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="position-relative">
              <button
                type="button"
                className="nav-link-custom border-0 bg-transparent"
                aria-expanded={menuOpen}
                onClick={toggleMegaMenu}
              >
                دسته‌بندی‌ها{" "}
                <i className="bi bi-chevron-down" />
              </button>

              {menuOpen && (
                <MegaMenu onClose={closeMegaMenu} />
              )}
            </div>
          </nav>

          <form
            className="search-form d-none d-md-block"
            onSubmit={submitSearch}
          >
            <label
              className="visually-hidden-custom"
              htmlFor="navbar-search"
            >
              جست‌وجوی لپ‌تاپ
            </label>

            <div className="search-wrap">
              <input
                id="navbar-search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                className="form-control"
                placeholder="جست‌وجوی مدل، برند یا مشخصات..."
              />

              <button
                type="submit"
                aria-label="جست‌وجو"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center gap-2 ms-auto">
            <button
              type="button"
              className="nav-icon-button d-none d-sm-grid"
              aria-label={
                darkMode
                  ? "فعال‌سازی حالت روشن"
                  : "فعال‌سازی حالت تیره"
              }
              onClick={toggleDarkMode}
            >
              <i
                className={`bi ${
                  darkMode ? "bi-sun" : "bi-moon-stars"
                }`}
              />
            </button>

            <Link
              className="nav-icon-button"
              to="/wishlist"
              aria-label="علاقه‌مندی‌ها"
            >
              <i className="bi bi-heart" />

              {wishlistCount > 0 && (
                <span className="nav-count">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              className="nav-icon-button"
              to="/cart"
              aria-label="سبد خرید"
            >
              <i className="bi bi-cart3" />

              {totalItems > 0 && (
                <span className="nav-count">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="d-none d-lg-flex align-items-center gap-2">
              {currentUser ? (
                <>
                  <Link
                    className="nav-link-custom"
                    to="/profile"
                  >
                    {firstName}
                  </Link>

                  <button
                    type="button"
                    className="nav-link-custom border-0 bg-transparent"
                    onClick={handleLogout}
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="nav-link-custom"
                    to="/login"
                  >
                    ورود
                  </Link>

                  <Link
                    className="action-button action-button--primary action-button--sm"
                    to="/register"
                  >
                    ثبت‌نام
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              className="nav-icon-button d-lg-none"
              aria-label="باز کردن منو"
              onClick={openMobileMenu}
            >
              <i className="bi bi-list" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}

export default Navbar;
