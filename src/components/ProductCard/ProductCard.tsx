import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import type { Product } from "../../types/product";

import styles from "./ProductCard.module.scss";

interface Props {
  product: Product;
}

function ProductCard({
  product,
}: Props) {
  const discountPercentage =
    product.salePrice
      ? Math.round(
          ((product.price -
            product.salePrice) /
            product.price) *
            100
        )
      : null;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.salePrice && (
          <span className={styles.saleBadge}>
            SALE
          </span>
        )}

        <button
          className={styles.wishlistButton}
          aria-label="Add to wishlist"
        >
          <FiHeart />
        </button>

        <Link
          to={`/product/${product.id}`}
          className={styles.imageLink}
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
        </Link>
      </div>

      <div className={styles.content}>
        <span className={styles.brand}>
          {product.brand}
        </span>

        <Link
          to={`/product/${product.id}`}
          className={styles.titleLink}
        >
          <h3 className={styles.title}>
            {product.name}
          </h3>
        </Link>

        <div className={styles.priceRow}>
          {product.salePrice ? (
            <>
              <span
                className={styles.salePrice}
              >
                ${product.salePrice}
              </span>

              <span
                className={
                  styles.originalPrice
                }
              >
                ${product.price}
              </span>

              <span
                className={styles.discount}
              >
                {discountPercentage}% OFF
              </span>
            </>
          ) : (
            <span className={styles.price}>
              ${product.price}
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          className={styles.cta}
        >
          Select Options
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;