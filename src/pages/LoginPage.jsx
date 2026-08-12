import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from "../components/forms/LoginForm";

import useDocumentTitle from "../hooks/useDocumentTitle";

import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  useDocumentTitle("ورود");

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="app-container page-content">
      <div className="auth-wrapper">
        <aside className="auth-aside">
          <span className="badge text-bg-light text-primary mb-3">
            Laptop Store
          </span>

          <h2 className="h2 fw-bold">
            به فروشگاه لپ‌تاپ خوش آمدید
          </h2>

          <p className="mt-3">
            سبد خرید، علاقه‌مندی‌ها و اطلاعات حساب خود را در یک
            محیط فارسی و راست‌چین مدیریت کنید.
          </p>

          <ul className="mt-4 d-grid gap-2">
            <li>
              <i className="bi bi-check2-circle ms-2" />
              پشتیبانی از LocalStorage
            </li>

            <li>
              <i className="bi bi-check2-circle ms-2" />
              سبد خرید پایدار
            </li>

            <li>
              <i className="bi bi-check2-circle ms-2" />
              کاملاً واکنش‌گرا
            </li>
          </ul>
        </aside>

        <div className="auth-form-area">
          <Link className="small text-muted" to="/">
            <i className="bi bi-arrow-right ms-1" />
            بازگشت به خانه
          </Link>

          <h1 className="mt-4">
            ورود به حساب کاربری
          </h1>

          <p>
            برای مدیریت پروفایل خود، اطلاعات ورود را وارد کنید.
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
