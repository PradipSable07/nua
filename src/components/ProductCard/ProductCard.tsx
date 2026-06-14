import { Link } from "react-router-dom";
import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";

import type { Product } from "../../types/product";
import { useCart } from "../../hooks/useCart";

import styles from "./ProductCard.module.scss";

interface Props {
	product: Product;
}

function ProductCard({ product }: Props) {
	const { addItem, updateQuantity, getItemByProductId, removeItem } = useCart();
	const defaultVariant = product.variants?.[0];

	const cartItem = getItemByProductId(product.id);
	const quantity = cartItem?.quantity || 0;
	const stock = defaultVariant?.stock ?? 0;

	const isOutOfStock = stock === 0;

	const isMaxedOut = quantity >= stock;
	const handleAdd = () => {
		const defaultVariant = product.variants?.[0];

		if (!defaultVariant) return;

		if (defaultVariant.stock === 0) return;

		addItem({
			cartItemId: crypto.randomUUID(),
			productId: product.id,
			name: product.name,
			image: product.images[0].url,
			price: product.salePrice ?? product.price,
			quantity: 1,
			variant: defaultVariant,
		});
	};

	const increase = () => {
		if (!cartItem) return;

		const maxStock = cartItem.variant.stock;

		if (cartItem.quantity >= maxStock) return;

		updateQuantity(cartItem.cartItemId, cartItem.quantity + 1);
	};

	const decrease = () => {
		if (!cartItem) return;

		if (cartItem.quantity === 1) {
			removeItem(cartItem.cartItemId);
		} else {
			updateQuantity(cartItem.cartItemId, cartItem.quantity - 1);
		}
	};

	const discountPercentage = product.salePrice
		? Math.round(((product.price - product.salePrice) / product.price) * 100)
		: null;

	return (
		<article className={styles.card}>
			<div className={styles.imageWrapper}>
				{product.salePrice && <span className={styles.saleBadge}>SALE</span>}

				<button className={styles.wishlistButton}>
					<FiHeart />
				</button>

				<Link to={`/product/${product.id}`} className={styles.imageLink}>
					<img
						src={product.images[0].url}
						alt={product.name}
						className={styles.image}
						loading='lazy'
					/>
				</Link>
			</div>

			<div className={styles.content}>
				<span className={styles.brand}>{product.brand}</span>

				<Link to={`/product/${product.id}`} className={styles.titleLink}>
					<h3 className={styles.title}>{product.name}</h3>
				</Link>

				<div className={styles.priceRow}>
					{product.salePrice ? (
						<>
							<span className={styles.salePrice}>${product.salePrice}</span>

							<span className={styles.originalPrice}>${product.price}</span>

							<span className={styles.discount}>{discountPercentage}% OFF</span>
						</>
					) : (
						<span className={styles.price}>${product.price}</span>
					)}
					<span className={styles.stock}>
						{stock > 0 ? `${stock} left` : "Out of stock"}
					</span>
				</div>

				{/*  QUICK ADD SECTION */}
				<div className={styles.cartAction}>
					{quantity === 0 ? (
						<button
							className={styles.cta}
							onClick={handleAdd}
							disabled={isOutOfStock || isMaxedOut}>
							{isOutOfStock
								? "Sold Out"
								: isMaxedOut
									? "Max Reached"
									: "Quick Add"}
						</button>
					) : (
						<div className={styles.qtyControl}>
							<button onClick={decrease}>
								<FiMinus />
							</button>

							<span>{quantity}</span>

							<button onClick={increase}>
								<FiPlus />
							</button>
						</div>
					)}
				</div>
			</div>
		</article>
	);
}

export default ProductCard;
