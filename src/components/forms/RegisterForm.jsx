import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ActionButton from "../common/ActionButton";

import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { validateRegister } from "../../utils/validation";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

function RegisterForm() {
  const { register } = useAuth();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const change = (key, value) => {
    setValues((data) => ({
      ...data,
      [key]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = validateRegister(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setLoading(true);

    const result = register(values);

    setLoading(false);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );

    if (result.success) {
      navigate("/", {
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
        <label
          className="form-label"
          htmlFor="register-name"
        >
          نام و نام خانوادگی
        </label>

        <input
          id="register-name"
          value={values.fullName}
          onChange={(event) =>
            change("fullName", event.target.value)
          }
          className={`form-control ${
            errors.fullName ? "is-invalid" : ""
          }`}
          autoComplete="name"
        />

        {errors.fullName && (
          <span className="form-error">
            {errors.fullName}
          </span>
        )}
      </div>

      <div className="mb-3">
        <label
          className="form-label"
          htmlFor="register-email"
        >
          ایمیل
        </label>

        <input
          id="register-email"
          type="email"
          value={values.email}
          onChange={(event) =>
            change("email", event.target.value)
          }
          className={`form-control ${
            errors.email ? "is-invalid" : ""
          }`}
          autoComplete="email"
        />

        {errors.email && (
          <span className="form-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="mb-3">
        <label
          className="form-label"
          htmlFor="register-phone"
        >
          شماره موبایل{" "}
          <span className="text-muted">
            (اختیاری)
          </span>
        </label>

        <input
          id="register-phone"
          inputMode="numeric"
          value={values.phone}
          onChange={(event) =>
            change("phone", event.target.value)
          }
          className={`form-control ${
            errors.phone ? "is-invalid" : ""
          }`}
          placeholder="09120000000"
          autoComplete="tel"
        />

        {errors.phone && (
          <span className="form-error">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="mb-3">
        <label
          className="form-label"
          htmlFor="register-password"
        >
          رمز عبور
        </label>

        <input
          id="register-password"
          type="password"
          value={values.password}
          onChange={(event) =>
            change("password", event.target.value)
          }
          className={`form-control ${
            errors.password ? "is-invalid" : ""
          }`}
          autoComplete="new-password"
        />

        {errors.password && (
          <span className="form-error">
            {errors.password}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label
          className="form-label"
          htmlFor="register-confirm"
        >
          تکرار رمز عبور
        </label>

        <input
          id="register-confirm"
          type="password"
          value={values.confirmPassword}
          onChange={(event) =>
            change("confirmPassword", event.target.value)
          }
          className={`form-control ${
            errors.confirmPassword ? "is-invalid" : ""
          }`}
          autoComplete="new-password"
        />

        {errors.confirmPassword && (
          <span className="form-error">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <ActionButton
        type="submit"
        className="w-100"
        isLoading={loading}
      >
        ایجاد حساب کاربری
      </ActionButton>

      <p className="text-center mt-4 mb-0 small">
        حساب دارید؟{" "}
        <Link
          className="text-primary fw-semibold"
          to="/login"
        >
          وارد شوید
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
