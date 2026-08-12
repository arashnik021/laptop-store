import { Link } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";

function NotFoundPage() {
  useDocumentTitle("صفحه پیدا نشد");

  return (
    <div className="app-container">
      <section className="not-found">
        <div className="not-found__code">
          ۴۰۴
        </div>

        <h1 className="h2 fw-bold">
          صفحه موردنظر پیدا نشد
        </h1>

        <p className="text-muted">
          ممکن است آدرس واردشده نادرست باشد یا صفحه
          موردنظر دیگر وجود نداشته باشد.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Link to="/" className="action-button action-button--primary">
            بازگشت به صفحه اصلی
          </Link>

          <Link to="/products" className="action-button action-button--outline">
            مشاهده محصولات
          </Link>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
