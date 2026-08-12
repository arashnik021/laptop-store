import { useEffect, useState } from "react";

import ActionButton from "../common/ActionButton";

import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { isValidEmail, isValidIranPhone } from "../../utils/validation";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
};

function ProfileForm() {
  const { currentUser, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setValues({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const validateForm = () => {
    const nextErrors = {};

    if (values.fullName.trim().length < 3) {
      nextErrors.fullName = "نام باید حداقل ۳ کاراکتر باشد.";
    }

    if (!isValidEmail(values.email)) {
      nextErrors.email = "لطفاً ایمیل معتبر وارد کنید.";
    }

    if (values.phone && !isValidIranPhone(values.phone)) {
      nextErrors.phone = "شماره موبایل معتبر نیست.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    const result = updateProfile(values);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );
  };

  return (
    <form
      className="surface-card p-4"
      onSubmit={handleSubmit}
    >
      <h2 className="h5 fw-bold mb-4">
        ویرایش اطلاعات کاربری
      </h2>

      <div className="row g-3">
        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="profile-name"
          >
            نام و نام خانوادگی
          </label>

          <input
            id="profile-name"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            value={values.fullName}
            onChange={(event) =>
              handleChange("fullName", event.target.value)
            }
          />

          {errors.fullName && (
            <span className="form-error">
              {errors.fullName}
            </span>
          )}
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="profile-email"
          >
            ایمیل
          </label>

          <input
            id="profile-email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={values.email}
            onChange={(event) =>
              handleChange("email", event.target.value)
            }
          />

          {errors.email && (
            <span className="form-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="col-md-6">
          <label
            className="form-label"
            htmlFor="profile-phone"
          >
            شماره موبایل
          </label>

          <input
            id="profile-phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={values.phone}
            onChange={(event) =>
              handleChange("phone", event.target.value)
            }
          />

          {errors.phone && (
            <span className="form-error">
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      <ActionButton
        type="submit"
        className="mt-4"
      >
        ذخیره تغییرات
      </ActionButton>
    </form>
  );
}

export default ProfileForm;
