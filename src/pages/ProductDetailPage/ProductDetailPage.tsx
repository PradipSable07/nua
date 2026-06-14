import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { getProduct } from "../../api/products";

import { useEffect, useState } from "react";

import type { Product } from "../../types/product";

import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

import EmptyState from "../../components/EmptyState/EmptyState";

import styles from "./ProductDetailPage.module.scss";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import VariantSelector from "../../components/VariantSelector/VariantSelector";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import { useCart } from "../../hooks/useCart";
const ProductDetailPage = () => {
	const { id } = useParams();

	const [product, setProduct] = useState<Product | null>(null);

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	const [selectedSize, setSelectedSize] = useState("");
	const [quantity, setQuantity] = useState(1);

	const { addItem } = useCart();
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
	useEffect(() => {
		if (!product) return;

		const firstVariant = product.variants[0];

		setSelectedColor(firstVariant.color);

		setSelectedSize(firstVariant.size);
	}, [product]);
	const selectedVariant = product?.variants.find(
		(variant) =>
			variant.color === selectedColor && variant.size === selectedSize,
	);

	useEffect(() => {
		setQuantity(1);
	}, [selectedColor, selectedSize]);
	if (loading) {
		return (
			<>
				<Navbar />
				<LoadingSkeleton count={1} />
			</>
		);
	}

	const handleAddToCart = () => {
		if (!product || !selectedVariant) return;

		addItem({
			cartItemId: selectedVariant.id,

			productId: product.id,

			name: product.name,

			image: product.images[0].url,

			price: product.salePrice ?? product.price,

			quantity,

			variant: selectedVariant,
		});
	};
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
					<ProductGallery images={product.images} />
				</section>

				<section className={styles.infoSection}>
					<span className={styles.brand}>{product.brand}</span>

					<h1 className={styles.title}>{product.name}</h1>

					<div className={styles.priceContainer}>
						{product.salePrice ? (
							<>
								<span className={styles.salePrice}>${product.salePrice}</span>

								<span className={styles.originalPrice}>${product.price}</span>
							</>
						) : (
							<span className={styles.price}>${product.price}</span>
						)}
					</div>

					<p className={styles.description}>{product.description}</p>

					<div className={styles.divider} />

					<div className={styles.variantContainer}>
						<VariantSelector
							variants={product.variants}
							selectedColor={selectedColor}
							selectedSize={selectedSize}
							onColorChange={setSelectedColor}
							onSizeChange={setSelectedSize}
						/>
						{selectedVariant && <p>Stock Available: {selectedVariant.stock}</p>}
					</div>

					<div className={styles.quantityContainer}>
						<QuantityPicker
							quantity={quantity}
							maxQuantity={selectedVariant?.stock ?? 0}
							onChange={setQuantity}
						/>
					</div>

					<button
						className={styles.addToCart}
						disabled={!selectedVariant || selectedVariant.stock === 0}
						onClick={handleAddToCart}>
						{selectedVariant?.stock === 0 ? "Sold Out" : "Add To Cart"}
					</button>
				</section>
			</main>
		</>
	);
};

export default ProductDetailPage;
