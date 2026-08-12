import { useState } from "react";

import ActionButton from "../common/ActionButton";

import { useToast } from "../../contexts/ToastContext";
import { validateContact } from "../../utils/validation";

const initialValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function ContactForm() {
  const { showToast } = useToast();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateContact(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setValues(initialValues);

    showToast(
      "پیام شما با موفقیت ثبت شد. این فرم در نسخه نمایشی به سرور ارسال نمی‌شود.",
      "success",
      5000
    );
  };

  const renderField = (key, label, type = "text") => {
    const fieldId = `contact-${key}`;
    const hasError = Boolean(errors[key]);

    return (
      <div className="mb-3">
        <label
          className="form-label"
          htmlFor={fieldId}
        >
          {label}
        </label>

        {type === "textarea" ? (
          <textarea
            id={fieldId}
            className={`form-control ${hasError ? "is-invalid" : ""}`}
            rows="5"
            value={values[key]}
            onChange={(event) => handleChange(key, event.target.value)}
          />
        ) : (
          <input
            id={fieldId}
            type={type}
            className={`form-control ${hasError ? "is-invalid" : ""}`}
            value={values[key]}
            onChange={(event) => handleChange(key, event.target.value)}
          />
        )}

        {hasError && (
          <span className="form-error">
            {errors[key]}
          </span>
        )}
      </div>
    );
  };

  return (
    <form
      className="surface-card p-4"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="h5 fw-bold mb-4">ارسال پیام</h2>

      {renderField("fullName", "نام و نام خانوادگی")}
      {renderField("email", "ایمیل", "email")}
      {renderField("subject", "موضوع")}
      {renderField("message", "پیام", "textarea")}

      <ActionButton type="submit" icon={<i className="bi bi-send" />}>
        ارسال پیام
      </ActionButton>
    </form>
  );
}

export default ContactForm;
