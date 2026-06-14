import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../../api/products";

import Navbar from "../../components/Navbar/Navbar";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import VariantSelector from "../../components/VariantSelector/VariantSelector";
import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import EmptyState from "../../components/EmptyState/EmptyState";

import { useCart } from "../../hooks/useCart";

import type { Product, ProductVariant } from "../../types/product";
import { useSearchParams } from "react-router-dom";

import styles from "./ProductDetailPage.module.scss";

function ProductDetailPage() {
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const { addItem, items } = useCart();

	const [product, setProduct] = useState<Product | null>(null);

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState("");

	const [selectedColor, setSelectedColor] = useState("");

	const [selectedSize, setSelectedSize] = useState("");

	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		async function fetchProduct() {
			try {
				setLoading(true);
				setError("");

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

		if (product.type !== "fashion" || product.variants.length === 0) {
			return;
		}

		const urlColor = searchParams.get("color");

		const urlSize = searchParams.get("size");

		const matchingVariant = product.variants.find(
			(variant) => variant.color === urlColor && variant.size === urlSize,
		);

		const defaultVariant = matchingVariant ?? product.variants[0];

		setSelectedColor(defaultVariant.color);

		setSelectedSize(defaultVariant.size);
	}, [product]);

	useEffect(() => {
		setQuantity(1);
	}, [selectedColor, selectedSize]);

	useEffect(() => {
		if (!selectedColor || !selectedSize) {
			return;
		}

		const currentColor = searchParams.get("color");

		const currentSize = searchParams.get("size");

		if (currentColor === selectedColor && currentSize === selectedSize) {
			return;
		}

		setSearchParams({
			color: selectedColor,
			size: selectedSize,
		});
	}, [selectedColor, selectedSize, searchParams, setSearchParams]);

	const selectedVariant = product?.variants.find(
		(variant) =>
			variant.color === selectedColor && variant.size === selectedSize,
	);

	const activeVariant = useMemo<ProductVariant | null>(() => {
		if (!product) {
			return null;
		}

		if (product.type === "fashion") {
			return selectedVariant ?? null;
		}

		return {
			id: `${product.id}-default`,
			color: "",
			size: "",
			stock: 99,
		};
	}, [product, selectedVariant]);

	const existingQuantity = items
		.filter((item) => item.cartItemId === activeVariant?.id)
		.reduce((total, item) => total + item.quantity, 0);

	const handleAddToCart = () => {
		if (!product || !activeVariant) {
			return;
		}

		addItem({
			cartItemId: activeVariant.id,

			productId: product.id,

			name: product.name,

			image: product.images[0].url,

			price: product.salePrice ?? product.price,

			quantity,

			variant: activeVariant,
		});
	};

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

					{product.type === "fashion" && (
						<div className={styles.variantContainer}>
							<VariantSelector
								variants={product.variants}
								selectedColor={selectedColor}
								selectedSize={selectedSize}
								onColorChange={setSelectedColor}
								onSizeChange={setSelectedSize}
							/>
						</div>
					)}

					<div className={styles.stockContainer}>
						<p>
							{activeVariant?.stock === 0
								? "Out of Stock"
								: `${activeVariant?.stock} units available`}
						</p>
					</div>

					<div className={styles.quantityContainer}>
						<QuantityPicker
							quantity={quantity}
							maxQuantity={activeVariant?.stock ?? 0}
							onChange={setQuantity}
						/>
					</div>

					<button
						className={styles.addToCart}
						disabled={!activeVariant || activeVariant.stock === 0}
						onClick={handleAddToCart}>
						{activeVariant?.stock === 0
							? "Sold Out"
							: existingQuantity > 0
								? `Add More (${existingQuantity} in Cart)`
								: "Add To Cart"}
					</button>
				</section>
			</main>
		</>
	);
}

export default ProductDetailPage;
