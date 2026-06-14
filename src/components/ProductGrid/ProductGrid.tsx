import type { Product } from "../../types/product";

import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductGrid.module.scss";

interface Props {
  products: Product[];
}

function ProductGrid({
  products,
}: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Featured Products</span>

        <h2>New Arrivals</h2>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;