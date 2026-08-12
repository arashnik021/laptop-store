import useDocumentTitle from "../hooks/useDocumentTitle";

import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/common/PageHeader";
import ContactForm from "../components/forms/ContactForm";

function ContactPage() {
  useDocumentTitle("تماس با ما");

  const breadcrumbItems = [
    {
      label: "خانه",
      path: "/",
    },
    {
      label: "تماس با ما",
    },
  ];

  return (
    <div className="app-container page-content">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="تماس با ما"
        description="پرسش یا نظر خود را در فرم زیر ثبت کنید؛ این بخش یک جریان نمایشی Front-End است."
      />

      <div className="contact-grid">
        <div className="d-grid gap-3">
          <article className="info-card">
            <i className="bi bi-telephone" />
            <h3>تلفن پشتیبانی نمونه</h3>
            <p dir="ltr">021-0000-0000</p>
          </article>

          <article className="info-card">
            <i className="bi bi-envelope" />
            <h3>ایمیل</h3>
            <p>info@laptopstore.ir</p>
          </article>

          <article className="info-card">
            <i className="bi bi-clock" />
            <h3>ساعات پاسخ‌گویی</h3>
            <p>شنبه تا پنج‌شنبه، ۹ تا ۱۸</p>
          </article>

          <article className="info-card">
            <i className="bi bi-geo-alt" />
            <h3>آدرس نمایشی</h3>
            <p>
              تهران، ایران — اطلاعات این بخش صرفاً برای نمایش رابط
              کاربری است.
            </p>
          </article>
        </div>

        <ContactForm />
      </div>

      <section className="section">
        <h2 className="h4 fw-bold mb-3">
          پرسش‌های متداول
        </h2>

        <div className="accordion" id="contact-faq">
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-one"
              >
                آیا خرید واقعی در این سایت انجام می‌شود؟
              </button>
            </h3>

            <div
              id="faq-one"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                خیر. Laptop Store یک پروژه Front-End آموزشی است
                و پرداخت یا ثبت سفارش واقعی ندارد.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h3 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-two"
              >
                اطلاعات فرم تماس کجا ذخیره می‌شود؟
              </button>
            </h3>

            <div
              id="faq-two"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                فرم فقط اعتبارسنجی سمت کاربر را نمایش می‌دهد و
                پیامی به سرور ارسال نمی‌کند.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
