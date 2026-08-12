import { Link } from "react-router-dom";

import { footerNavigation } from "../../data/navigation";

import NewsletterForm from "../forms/NewsletterForm";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="app-container">
        <div className="site-footer__grid">
          <div>
            <Link className="site-logo text-white" to="/">
              <span className="site-logo__mark">
                <i className="bi bi-laptop" />
              </span>
              Laptop Store
            </Link>

            <p className="mt-3 mb-3 small">
              Laptop Store یک فروشگاه نمونه آموزشی است که با هدف نمایش تجربه
              کاربری مدرن در فروش لپ‌تاپ طراحی شده است.
            </p>

            <div className="d-flex gap-2">
              <a
                className="nav-icon-button"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="گیت‌هاب"
              >
                <i className="bi bi-github" />
              </a>

              <a
                className="nav-icon-button"
                href="mailto:info@laptopstore.ir"
                aria-label="ارسال ایمیل"
              >
                <i className="bi bi-envelope" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="site-footer__title">دسترسی سریع</h2>

            {footerNavigation.quickLinks.map((item) => (
              <Link key={item.path} className="footer-link" to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h2 className="site-footer__title">راهنمای مشتریان</h2>

            {footerNavigation.customerGuide.map((item) => (
              <Link key={item.path} className="footer-link" to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h2 className="site-footer__title">خبرنامه</h2>

            <p className="small mb-3">
              با ثبت ایمیل، از محصولات و پیشنهادهای نمونه فروشگاه باخبر شوید.
            </p>

            <NewsletterForm compact />
          </div>
        </div>

        <div className="d-flex justify-content-start mt-5 pt-4 border-top border-secondary-subtle small">
          <span dir="ltr">© 2026 Laptop Store. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
