import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegisterForm from "../components/forms/RegisterForm";

import { useAuth } from "../contexts/AuthContext";

import useDocumentTitle from "../hooks/useDocumentTitle";

function RegisterPage() {
  useDocumentTitle("ثبت‌نام");

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="app-container page-content">
      <div className="auth-wrapper">
        <aside className="auth-aside">
          <span className="badge text-bg-light text-primary mb-3">
            شروع تجربه شما
          </span>

          <h2 className="h2 fw-bold">
            حساب خود را ایجاد کنید
          </h2>

          <p className="mt-3">
            ثبت‌نام در این پروژه صرفاً برای نمایش جریان رابط کاربری و
            LocalStorage انجام می‌شود.
          </p>

          <div className="mt-4 p-3 rounded bg-white bg-opacity-10">
            اطلاعات شما فقط در مرورگر خودتان ذخیره می‌شود.
          </div>
        </aside>

        <div className="auth-form-area">
          <Link
            className="small text-muted"
            to="/"
          >
            <i className="bi bi-arrow-right ms-1" />
            بازگشت به خانه
          </Link>

          <h1 className="mt-4">
            ایجاد حساب کاربری
          </h1>

          <p>
            اطلاعات پایه خود را وارد کنید تا حساب نمایشی شما ساخته شود.
          </p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
