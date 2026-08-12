function RatingStars({
  rating = 0,
  reviewCount,
  showValue = true,
  className = "",
}) {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      className={`rating ${className}`}
      aria-label={`امتیاز ${rating} از ۵`}
    >
      {stars.map((star) => {
        const starClass =
          roundedRating >= star
            ? "bi-star-fill"
            : roundedRating >= star - 0.5
            ? "bi-star-half"
            : "bi-star";

        return (
          <i
            key={star}
            className={`bi ${starClass}`}
            aria-hidden="true"
          />
        );
      })}

      {showValue && (
        <span className="rating__value">
          {rating}
        </span>
      )}

      {typeof reviewCount === "number" && (
        <span className="rating__count">
          ({reviewCount} نظر)
        </span>
      )}
    </div>
  );
}

export default RatingStars;
