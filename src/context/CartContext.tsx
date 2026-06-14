import { createContext, useReducer, useMemo, useEffect } from "react";

import type { ReactNode } from "react";

import { cartReducer } from "./cartReducer";

import { loadCart, saveCart } from "../services/cartStorage";

import type { CartContextValue } from "./cartContext.types";

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface Props {
	children: ReactNode;
}

export function CartProvider({ children }: Props) {
	const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

	useEffect(() => {
		saveCart(state);
	}, [state]);

	const value = useMemo<CartContextValue>(
		() => ({
			items: state.items,

			totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),

			subtotal: state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0,
			),

			addItem: (item) =>
				dispatch({
					type: "ADD_ITEM",
					payload: item,
				}),

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
						quantity,
					},
				}),

			clearCart: () =>
				dispatch({
					type: "CLEAR_CART",
				}),
		}),
		[state],
	);
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
