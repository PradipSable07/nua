import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { getProduct } from "../../api/products";

import { useEffect, useState } from "react";

import type { Product } from "../../types/product";

import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

import EmptyState from "../../components/EmptyState/EmptyState";

import styles from "./ProductDetailPage.module.scss";
import ProductGallery from "../../components/ProductGallery/ProductGallery";

const ProductDetailPage = () => {
	const { id } = useParams();

	const [product, setProduct] = useState<Product | null>(null);

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchProduct() {
			try {
				setLoading(true);

				const data = await getProduct(id!);

				setProduct(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong");
			} finally {
				setLoading(false);
			}
		}

		fetchProduct();
	}, [id]);

	if (loading) {
		return (
			<>
				<Navbar />
				<LoadingSkeleton count={1} />
			</>
		);
	}

	if (error || !product) {
		return (
			<>
				<Navbar />

				<EmptyState
					title='Product Not Found'
					description={error || "Unable to load product."}
				/>
			</>
		);
	}

	return (
  <>
    <Navbar />

    <main className={styles.page}>
      <section className={styles.gallerySection}>
        <ProductGallery
    images={product.images}
  />
      </section>

      <section className={styles.infoSection}>
        <span className={styles.brand}>
          {product.brand}
        </span>

        <h1 className={styles.title}>
          {product.name}
        </h1>

        <div className={styles.priceContainer}>
          {product.salePrice ? (
            <>
              <span className={styles.salePrice}>
                ${product.salePrice}
              </span>

              <span className={styles.originalPrice}>
                ${product.price}
              </span>
            </>
          ) : (
            <span className={styles.price}>
              ${product.price}
            </span>
          )}
        </div>

        <p className={styles.description}>
          {product.description}
        </p>

        <div className={styles.divider} />

        <div className={styles.variantContainer}>
          Variant Selector Here
        </div>

        <div className={styles.quantityContainer}>
          Quantity Picker Here
        </div>

        <button className={styles.addToCart}>
          Add To Cart
        </button>
      </section>
    </main>
  </>
);
};

export default ProductDetailPage;
