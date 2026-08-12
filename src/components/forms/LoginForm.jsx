import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ActionButton from "../common/ActionButton";

import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { validateLogin } from "../../utils/validation";

const initialValues = {
  email: "",
  password: "",
};

function LoginForm() {
  const { login } = useAuth();
  const { showToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (key, value) => {
    setValues((data) => ({
      ...data,
      [key]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = validateLogin(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setLoading(true);

    const result = login(values.email, values.password);

    setLoading(false);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );

    if (result.success) {
      navigate(location.state?.from || "/", {
        replace: true,
      });
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
    >
      <div className="mb-3">
        <label className="form-label" htmlFor="login-email">ایمیل</label>

        <input
          id="login-email"
          type="email"
          value={values.email}
          onChange={(event) => change("email", event.target.value)}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="example@email.com"
          autoComplete="email"
        />

        {errors.email && (<span className="form-error">{errors.email}</span>)}
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="login-password">
          رمز عبور
        </label>

        <div className="password-field">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={(event) => change("password", event.target.value)}
            className={`form-control ${
              errors.password ? "is-invalid" : ""
            }`}
            autoComplete="current-password"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={
              showPassword
                ? "مخفی کردن رمز عبور"
                : "نمایش رمز عبور"
            }
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}/>
          </button>
        </div>

        {errors.password && (<span className="form-error">{errors.password}</span>)}
      </div>

      <ActionButton type="submit" className="w-100" isLoading={loading}>
        ورود به حساب کاربری
      </ActionButton>

      <div className="mt-4 p-3 rounded bg-light-subtle small">
        <strong>حساب نمونه:</strong>
        <br />
        demo@laptopstore.ir
        <br />
        رمز عبور: laptop123
      </div>

      <p className="text-center mt-4 mb-0 small">
        حساب ندارید؟{" "}
        <Link className="text-primary fw-semibold" to="/register">
          ثبت‌نام کنید
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
