import { IoClose } from "react-icons/io5";

import { useUI } from "../../hooks/useUI";

import styles from "./CartDrawer.module.scss";

function CartDrawer() {
	const {
		isCartOpen,
		closeCart,
	} = useUI();

	return (
		<>
			{isCartOpen && (
				<div
					className={styles.overlay}
					onClick={closeCart}
				/>
			)}

			<aside
				className={`${styles.drawer} ${
					isCartOpen
						? styles.open
						: ""
				}`}
			>
				<header
					className={
						styles.header
					}
				>
					<h2>
						Shopping Cart
					</h2>

					<button
						onClick={
							closeCart
						}
					>
						<IoClose />
					</button>
				</header>

				<div
					className={
						styles.body
					}
				>
					Cart Items Here
				</div>
			</aside>
		</>
	);
}

export default CartDrawer;