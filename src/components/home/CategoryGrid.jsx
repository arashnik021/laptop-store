import { products } from "../../data/products";

import CategoryCard from "./CategoryCard";

function CategoryGrid({ categories }) {
  return (
    <div className="product-grid">
      {categories.map((category) => {
        const productCount = products.filter(
          (product) => product.category === category.slug
        ).length;

        return (
          <CategoryCard
            key={category.id}
            category={category}
            count={productCount}
          />
        );
      })}
    </div>
  );
}

export default CategoryGrid;
