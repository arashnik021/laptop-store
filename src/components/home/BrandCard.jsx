import { Link } from "react-router-dom";

function BrandCard({ brand }) {
  const brandUrl = `/products?brand=${encodeURIComponent(
    brand.name
  )}`;

  return (
    <Link
      className="brand-card"
      to={brandUrl}
    >
      <img src={brand.logo} alt={`لوگوی ${brand.title}`}/>
      <span>{brand.title}</span>
    </Link>
  );
}

export default BrandCard;
