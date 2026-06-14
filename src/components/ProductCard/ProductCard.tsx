import { Link } from "react-router-dom";

import type { Product } from "../../types/product";

import styles from "./ProductCard.module.scss";

interface Props {
  product: Product;
}

function ProductCard({
  product,
}: Props) {
  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.id}`}
      >
        <img
          src={product.images[0].url}
          alt={product.name}
        />

        <h3>{product.name}</h3>
      </Link>

      <p>
        ${product.salePrice ??
          product.price}
      </p>

      <button>
        Quick Add
      </button>
    </article>
  );
}

export default ProductCard;