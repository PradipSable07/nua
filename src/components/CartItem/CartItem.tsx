import { IoTrashOutline } from "react-icons/io5";

import { useCart } from "../../hooks/useCart";

import type { CartItem as CartItemType } from "../../types/cart";

import styles from "./CartItem.module.scss";

interface Props {
	item: CartItemType;
}

function CartItem({ item }: Props) {
	const { updateQuantity, removeItem } = useCart();

	const isFashion = item.variant.color || item.variant.size;

	return (
		<article className={styles.card}>
			<img src={item.image} alt={item.name} className={styles.image} />

			<div className={styles.content}>
				<div className={styles.topRow}>
					<h4 className={styles.name}>{item.name}</h4>

					<button
						className={styles.removeButton}
						onClick={() => removeItem(item.cartItemId)}>
						<IoTrashOutline />
					</button>
				</div>

				{isFashion && (
					<p className={styles.variant}>
						{item.variant.color}
						{" • "}
						{item.variant.size}
					</p>
				)}

				<p className={styles.price}>${item.price.toFixed(2)}</p>

				<div className={styles.quantityControls}>
					<button
						onClick={() =>
							updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))
						}>
						−
					</button>

					<span>{item.quantity}</span>

					<button
					disabled={item.quantity >= item.variant.stock}
						onClick={() =>
							updateQuantity(
								item.cartItemId,
								Math.min(item.variant.stock, item.quantity + 1),
							)
						}>
						+
					</button>
				</div>
				{item.quantity >= item.variant.stock && (
					<span className={styles.warning}>Max stock reached</span>
				)}
			</div>
		</article>
	);
}

export default CartItem;
