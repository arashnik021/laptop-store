import { Link } from "react-router-dom";

import BrandSection from "../components/home/BrandSection";
import CategoryGrid from "../components/home/CategoryGrid";

import Breadcrumb from "../components/common/Breadcrumb";
import PageHeader from "../components/common/PageHeader";

import { categories } from "../data/categories";

import useDocumentTitle from "../hooks/useDocumentTitle";

function CategoriesPage() {
  useDocumentTitle("دسته‌بندی‌ها");

  const breadcrumbItems = [
    {
      label: "خانه",
      path: "/",
    },
    {
      label: "دسته‌بندی‌ها",
    },
  ];

  return (
    <>
      <div className="app-container page-content">
        <Breadcrumb items={breadcrumbItems} />

        <PageHeader
          title="دسته‌بندی‌های لپ‌تاپ"
          description="براساس نوع استفاده، گزینه مناسب خود را سریع‌تر پیدا کنید."
        />

        <CategoryGrid categories={categories} />

        <section className="section">
          <div className="home-banner">
            <span className="small fw-bold">
              انتخاب آگاهانه
            </span>

            <h2>
              برای انتخاب لپ‌تاپ مناسب نیاز به راهنمایی دارید؟
            </h2>

            <p>
              نوع استفاده، بودجه، وزن و مشخصات سخت‌افزاری را
              با فیلترهای محصولات بررسی کنید.
            </p>

            <Link
              to="/products"
              className="action-button action-button--outline bg-white text-primary align-self-start"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        </section>
      </div>

      <BrandSection />
    </>
  );
}

export default CategoriesPage;
