import { IoClose } from "react-icons/io5";

import { useUI } from "../../hooks/useUI";
import { useCart } from "../../hooks/useCart";

import CartItem from "../CartItem/CartItem";

import EmptyState from "../EmptyState/EmptyState";
import styles from "./CartDrawer.module.scss";

function CartDrawer() {
	const { isCartOpen, closeCart } = useUI();
	const { items, subtotal } = useCart();

	return (
		<>
			{isCartOpen && <div className={styles.overlay} onClick={closeCart} />}

			<aside className={`${styles.drawer} ${isCartOpen ? styles.open : ""}`}>
				<header className={styles.header}>
					<h2>Shopping Cart</h2>

					<button onClick={closeCart}>
						<IoClose />
					</button>
				</header>

				<div className={styles.body}>
					{items.length === 0 ? (
						<EmptyState
							title='Your cart is empty'
							description='Add products to start shopping.'
						/>
					) : (
						items.map((item) => <CartItem key={item.cartItemId} item={item} />)
					)}
				</div>
				{items.length > 0 && (
					<footer className={styles.summary}>
						<div className={styles.summaryRow}>
							<span>Subtotal</span>

							<span>${subtotal.toFixed(2)}</span>
						</div>

						<div className={styles.summaryRow}>
							<span>Shipping</span>

							<span>Free</span>
						</div>

						<div className={styles.totalRow}>
							<span>Total</span>

							<span>${subtotal.toFixed(2)}</span>
						</div>

						<button className={styles.checkoutButton}>Checkout</button>
					</footer>
				)}
			</aside>
		</>
	);
}

export default CartDrawer;
