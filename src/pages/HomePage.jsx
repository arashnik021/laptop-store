import { Link } from "react-router-dom";

import SectionHeader from "../components/common/SectionHeader";

import BrandSection from "../components/home/BrandSection";
import CategoryGrid from "../components/home/CategoryGrid";
import HeroSlider from "../components/home/HeroSlider";
import Newsletter from "../components/home/Newsletter";
import ProductSection from "../components/home/ProductSection";
import TestimonialCard from "../components/home/TestimonialCard";

import { categories } from "../data/categories";
import { products } from "../data/products";
import { testimonials } from "../data/testimonials";

import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  getBestSellerProducts,
  getDiscountedProducts,
  getNewProducts,
} from "../utils/productHelpers";

function HomePage() {
  useDocumentTitle("فروشگاه لپ‌تاپ");

  const specials = getDiscountedProducts().slice(0, 8);
  const newest = getNewProducts().slice(0, 8);
  const best = getBestSellerProducts().slice(0, 8);

  const gamingProducts = products.filter(
    (item) => item.category === "gaming"
  );

  const businessProducts = products.filter(
    (item) => item.category === "business"
  );

  const studentProducts = products.filter(
    (item) => item.category === "student"
  );

  return (
    <>
      <section className="section pt-4">
        <div className="app-container">
          <HeroSlider />
        </div>
      </section>

      <section className="pb-2">
        <div className="app-container">
          <div className="benefits-bar">
            <div className="benefit-item">
              <i className="bi bi-truck" />

              <div>
                <strong>ارسال سریع</strong>
                <span>ارسال نمایشی سفارش‌ها</span>
              </div>
            </div>

            <div className="benefit-item">
              <i className="bi bi-shield-check" />

              <div>
                <strong>اصالت کالا</strong>
                <span>اطلاعات محصول شفاف</span>
              </div>
            </div>

            <div className="benefit-item">
              <i className="bi bi-headset" />

              <div>
                <strong>مشاوره تخصصی</strong>
                <span>راهنمای انتخاب محصول</span>
              </div>
            </div>

            <div className="benefit-item">
              <i className="bi bi-arrow-repeat" />

              <div>
                <strong>رابط ساده</strong>
                <span>جست‌وجو و فیلتر سریع</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="app-container">
          <SectionHeader
            title="انتخاب بر اساس نیاز شما"
            subtitle="از میان ۸ دسته‌بندی، گزینه مناسب خود را پیدا کنید"
            linkTo="/categories"
          />

          <CategoryGrid categories={categories} />
        </div>
      </section>

      <ProductSection
        title="پیشنهادهای ویژه"
        subtitle="چند مدل منتخب با قیمت کاهش‌یافته"
        products={specials}
        variant="slider"
      />

      <ProductSection
        title="جدیدترین لپ‌تاپ‌ها"
        subtitle="مدل‌های تازه اضافه‌شده به فروشگاه"
        products={newest}
      />

      <ProductSection
        title="پرفروش‌ترین انتخاب‌ها"
        subtitle="محبوب‌ترین مدل‌ها در داده نمونه فروشگاه"
        products={best}
        variant="slider"
      />

      <ProductSection
        title="لپ‌تاپ‌های گیمینگ"
        subtitle="قدرت سخت‌افزاری برای بازی و رندر"
        products={gamingProducts}
      />

      <section className="section">
        <div className="app-container">
          <div className="home-banner">
            <span className="small fw-bold">
              راهنمای انتخاب هوشمند
            </span>

            <h2>
              لپ‌تاپ مناسب برنامه‌نویسی، طراحی یا دانشگاه را با
              فیلترهای دقیق پیدا کنید.
            </h2>

            <p>
              برند، دسته، بازه قیمت، امتیاز و وضعیت موجودی را
              هم‌زمان بررسی کنید تا انتخاب ساده‌تری داشته باشید.
            </p>

            <Link
              to="/products"
              className="action-button action-button--outline bg-white text-primary align-self-start"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        </div>
      </section>

      <ProductSection
        title="لپ‌تاپ‌های اداری و تجاری"
        subtitle="قابل اعتماد برای شرکت، جلسه و مدیریت روزانه"
        products={businessProducts}
      />

      <ProductSection
        title="لپ‌تاپ‌های دانشجویی"
        subtitle="سبک، اقتصادی و مناسب هر روز"
        products={studentProducts}
      />

      <BrandSection />

      <section className="section section--soft">
        <div className="app-container">
          <SectionHeader
            title="نظر نمونه کاربران"
            subtitle="بازخوردهای ساختگی برای نمایش رابط کاربری بخش نظرات"
          />

          <div className="product-grid">
            {testimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

export default HomePage;
