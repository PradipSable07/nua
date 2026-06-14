import {
	createContext,
	useReducer,
	useMemo,
	useEffect,
	useCallback,
} from "react";

import type { ReactNode } from "react";

import { cartReducer } from "./cartReducer";
import { loadCart, saveCart } from "../services/cartStorage";

import type { CartContextValue } from "./cartContext.types";
import type { CartItem } from "../types/cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface Props {
	children: ReactNode;
}

export function CartProvider({ children }: Props) {
	const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

	// persist cart
	useEffect(() => {
		saveCart(state);
	}, [state]);

	// 🔥 selector (optimized)
	const getItemByProductId = useCallback(
		(productId: number): CartItem | undefined => {
			return state.items.find((item) => item.productId === productId);
		},
		[state.items],
	);

	const value = useMemo<CartContextValue>(
		() => ({
			items: state.items,

			totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),

			subtotal: state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0,
			),

			addItem: (item) => {
				const existing = state.items.find(
					(i) => i.variant.id === item.variant.id,
				);

				const currentQty = existing?.quantity ?? 0;

				const maxStock = item.variant.stock;

				const nextQty = currentQty + item.quantity;

				if (nextQty > maxStock) {
					dispatch({
						type: "UPDATE_QUANTITY",
						payload: {
							cartItemId: item.cartItemId,
							quantity: maxStock,
						},
					});
					return;
				}

				dispatch({
					type: "ADD_ITEM",
					payload: item,
				});
			},

			removeItem: (cartItemId) =>
				dispatch({
					type: "REMOVE_ITEM",
					payload: cartItemId,
				}),

			updateQuantity: (cartItemId, quantity) =>
				dispatch({
					type: "UPDATE_QUANTITY",
					payload: {
						cartItemId,
						quantity: Math.max(1, quantity),
					},
				}),

			clearCart: () =>
				dispatch({
					type: "CLEAR_CART",
				}),

			getItemByProductId,
		}),
		[state.items, getItemByProductId],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
