import { Link } from "react-router-dom";

import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/common/PageHeader";

import useDocumentTitle from "../hooks/useDocumentTitle";

function AboutPage() {
  useDocumentTitle("درباره ما");

  return (
    <div className="app-container page-content">
      <Breadcrumb
        items={[
          {
            label: "خانه",
            path: "/",
          },
          {
            label: "درباره ما",
          },
        ]}
      />

      <PageHeader
        title="درباره Laptop Store"
        description="معرفی یک فروشگاه نمونه آموزشی، ساخته‌شده با React و اصول UI/UX مدرن."
      />

      <section className="about-hero">
        <span className="small fw-bold">
          پروژه دانشگاهی و پورتفولیو
        </span>

        <h2>
          تجربه‌ای ساده، شفاف و فارسی برای انتخاب لپ‌تاپ
        </h2>

        <p>
          Laptop Store یک فروشگاه نمونه آموزشی است که برای نمایش
          معماری React، طراحی Responsive، Context API و تجربه
          کاربری فروشگاهی طراحی شده است.
        </p>

        <Link
          to="/products"
          className="action-button action-button--outline bg-white text-primary align-self-start"
        >
          مشاهده محصولات
        </Link>
      </section>

      <section className="section">
        <div className="row g-4">
          <div className="col-lg-7">
            <h2 className="h3 fw-bold mb-3">
              داستان پروژه
            </h2>

            <p className="text-muted">
              هدف پروژه، ساخت یک رابط فروشگاهی قابل نگهداری و نزدیک
              به تجربه‌های واقعی تجارت الکترونیک است؛ بدون وابستگی
              به Backend یا سرویس خارجی. داده‌ها Mock هستند اما تمام
              جریان‌های مهم رابط کاربری، مانند جست‌وجو، فیلتر،
              سبد خرید، علاقه‌مندی و ورود نمایشی، قابل استفاده‌اند.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="surface-card p-4 h-100">
              <h3 className="h5 fw-bold">
                چرا این ساختار؟
              </h3>

              <ul className="mt-3 d-grid gap-2 text-muted">
                <li>
                  <i className="bi bi-check2-circle text-success ms-2" />
                  کامپوننت‌های قابل استفاده مجدد
                </li>

                <li>
                  <i className="bi bi-check2-circle text-success ms-2" />
                  مدیریت وضعیت با Context API
                </li>

                <li>
                  <i className="bi bi-check2-circle text-success ms-2" />
                  طراحی Mobile First و RTL
                </li>

                <li>
                  <i className="bi bi-check2-circle text-success ms-2" />
                  ساختار قابل توسعه برای API آینده
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>۳۰</strong>
            <span>محصول نمونه</span>
          </div>

          <div className="stat-card">
            <strong>۸</strong>
            <span>دسته‌بندی</span>
          </div>

          <div className="stat-card">
            <strong>۱۰</strong>
            <span>برند</span>
          </div>

          <div className="stat-card">
            <strong>۱۰۰٪</strong>
            <span>فارسی و RTL</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="h3 fw-bold mb-4">
          ارزش‌های طراحی
        </h2>

        <div className="benefit-grid">
          <div className="info-card">
            <i className="bi bi-phone" />

            <h3>Mobile First</h3>

            <p>
              رابط از ابتدا برای نمایشگرهای کوچک طراحی شده و سپس
              در دسکتاپ گسترش می‌یابد.
            </p>
          </div>

          <div className="info-card">
            <i className="bi bi-universal-access" />

            <h3>دسترس‌پذیری</h3>

            <p>
              Labelها، Focus قابل مشاهده، متن جایگزین و ساختار
              معنایی در طراحی لحاظ شده‌اند.
            </p>
          </div>

          <div className="info-card">
            <i className="bi bi-boxes" />

            <h3>قابل نگهداری</h3>

            <p>
              داده، منطق، کامپوننت‌ها و صفحه‌ها در پوشه‌های مستقل
              سازمان‌دهی شده‌اند.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
