import { Link } from "react-router-dom";

function CategoryCard({ category, count }) {
  const categoryUrl = `/categories/${category.slug}`;

  return (
    <Link
      to={categoryUrl}
      className="category-card d-block"
    >
      <div className="category-card__image">
        <img
          src={category.image}
          alt={category.title}
        />
      </div>

      <h3>{category.title}</h3>

      <p>{category.description}</p>

      <span className="d-inline-block mt-2 text-primary small fw-semibold">
        {count} محصول{" "}
        <i className="bi bi-arrow-left" />
      </span>
    </Link>
  );
}

export default CategoryCard;
