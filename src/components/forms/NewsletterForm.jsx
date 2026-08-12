import { useState } from "react";

import ActionButton from "../common/ActionButton";

import { useToast } from "../../contexts/ToastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../utils/storageKeys";
import { isValidEmail } from "../../utils/validation";

function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useLocalStorage(
    STORAGE_KEYS.NEWSLETTER_EMAILS,
    []
  );

  const { showToast } = useToast();

  const inputId = compact ? "footer-newsletter" : "home-newsletter";
  const formClassName = `newsletter__form ${compact ? "flex-column" : ""}`;
  const buttonVariant = compact ? "outline" : "secondary";

  const submit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      showToast("لطفاً یک ایمیل معتبر وارد کنید.", "error");
      return;
    }

    if (!emails.includes(normalizedEmail)) {
      setEmails((items) => [...items, normalizedEmail]);
    }

    setEmail("");

    showToast("ایمیل شما با موفقیت در خبرنامه ثبت شد.", "success");
  };

  return (
    <form
      className={formClassName}
      onSubmit={submit}
    >
      <label className="visually-hidden-custom" htmlFor={inputId}>
        ایمیل برای خبرنامه
      </label>

      <input
        id={inputId}
        className="form-control"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="ایمیل شما"
      />

      <ActionButton variant={buttonVariant} type="submit">
        ثبت ایمیل
      </ActionButton>
    </form>
  );
}

export default NewsletterForm;
