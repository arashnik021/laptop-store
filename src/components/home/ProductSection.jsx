import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import SectionHeader from "../common/SectionHeader";
import ProductCard from "../product/ProductCard";

const sliderBreakpoints = {
  576: {
    slidesPerView: 2.15,
  },
  768: {
    slidesPerView: 3.15,
  },
  1200: {
    slidesPerView: 4.15,
  },
};

function ProductSection({
  title,
  subtitle,
  products,
  linkTo = "/products",
  variant = "grid",
}) {
  if (!products.length) {
    return null;
  }

  const isSlider = variant === "slider";

  return (
    <section className="section">
      <div className="app-container">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          linkTo={linkTo}
        />

        {isSlider ? (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={sliderBreakpoints}
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="h-auto"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;
