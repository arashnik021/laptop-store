import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { heroSlides } from "../../data/heroSlides";

function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{delay: 5500, disableOnInteraction: false,}}
      navigation
      pagination={{clickable: true,}}
      loop
      className="hero-slider"
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <section className={`hero-slide hero-slide--${slide.theme}`}>
            <div className="hero-slide__content">
              <div>
                <span className="hero-slide__eyebrow">{slide.eyebrow}</span>

                <h2>{slide.title}</h2>

                <p>{slide.subtitle}</p>

                <div className="hero-slide__actions">
                  <Link
                    className="action-button action-button--primary"
                    to={slide.primaryButtonLink}
                  >
                    {slide.primaryButtonText}
                  </Link>

                  <Link
                    className="action-button action-button--outline"
                    to={slide.secondaryButtonLink}
                  >
                    {slide.secondaryButtonText}
                  </Link>
                </div>
              </div>

              <div className="hero-slide__image">
                <img src={slide.image} alt=""/>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;
