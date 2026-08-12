import RatingStars from "../common/RatingStars";

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__top">
        <div className="testimonial-card__avatar">
          {item.avatar}
        </div>

        <div>
          <h3 className="h6 mb-0 fw-bold">{item.name}</h3>

          <span className="small text-muted">{item.role}</span>
        </div>
      </div>

      <RatingStars
        rating={item.rating}
        showValue={false}
      />

      <h4 className="h6 mt-3 mb-2 fw-bold">{item.title}</h4>

      <p>{item.text}</p>

      <span className="status-badge status-badge--info mt-3">
        {item.verifiedLabel}
      </span>
    </article>
  );
}

export default TestimonialCard;
