import { useNavigate } from "react-router-dom";

import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/common/PageHeader";

import ProfileForm from "../components/forms/ProfileForm";

import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { useWishlist } from "../contexts/WishlistContext";

import useDocumentTitle from "../hooks/useDocumentTitle";

function ProfilePage() {
  useDocumentTitle("پروفایل کاربری");

  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const exit = () => {
    const result = logout();

    showToast(result.message, "success");
    navigate("/");
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
            label: "پروفایل کاربری",
          },
        ]}
      />

      <PageHeader
        title="پروفایل کاربری"
        description="اطلاعات پایه حساب نمایشی خود را مشاهده و ویرایش کنید."
      />

      <div className="profile-grid">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            {currentUser.fullName?.charAt(0) || "ک"}
          </div>

          <h2 className="h5 fw-bold mb-1">
            {currentUser.fullName}
          </h2>

          <p className="small text-muted">
            {currentUser.email}
          </p>

          <hr />

          <div className="d-grid gap-2 small">
            <span>
              <i className="bi bi-cart3 ms-2 text-primary" />
              {totalItems} کالا در سبد خرید
            </span>

            <span>
              <i className="bi bi-heart ms-2 text-danger" />
              {wishlistCount} علاقه‌مندی
            </span>

            <span>
              <i className="bi bi-shield-check ms-2 text-success" />
              حساب فعال
            </span>
          </div>

          <button
            className="btn btn-outline-danger w-100 mt-4"
            onClick={exit}
          >
            <i className="bi bi-box-arrow-right ms-1" />
            خروج از حساب
          </button>
        </aside>

        <div>
          <ProfileForm />

          <div className="summary-cards mt-4">
            <div className="profile-summary-card">
              <span className="small text-muted">
                سبد خرید
              </span>

              <strong>{totalItems}</strong>

              <span className="small">
                کالا
              </span>
            </div>

            <div className="profile-summary-card">
              <span className="small text-muted">
                علاقه‌مندی‌ها
              </span>

              <strong>{wishlistCount}</strong>

              <span className="small">
                محصول
              </span>
            </div>
          </div>

          <div className="alert alert-info mt-4 mb-0">
            <i className="bi bi-info-circle ms-2" />
            این بخش در نسخه نمایشی Front-End پیاده‌سازی شده است و
            اطلاعات حساب فقط در LocalStorage مرورگر شما ذخیره می‌شوند.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
