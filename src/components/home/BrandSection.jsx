import { brands } from "../../data/brands";

import SectionHeader from "../common/SectionHeader";
import BrandCard from "./BrandCard";

function BrandSection() {
  return (
    <section className="section">
      <div className="app-container">
        <SectionHeader
          title="خرید بر اساس برند"
          subtitle="برندهای محبوب لپ‌تاپ در یک نگاه"
          linkTo="/products"
        />

        <div className="brand-grid">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
