import { useState } from "react";

function ProductGallery({
  images = [],
  productName,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return null;
  }

  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img
          src={activeImage}
          alt={`${productName} - تصویر ${activeIndex + 1}`}
        />
      </div>

      <div
        className="gallery__thumbs"
        aria-label="تصاویر محصول"
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image}
              type="button"
              className={`gallery__thumb ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`نمایش تصویر ${index + 1} محصول`}
              aria-pressed={isActive}
            >
              <img
                src={image}
                alt=""
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductGallery;
