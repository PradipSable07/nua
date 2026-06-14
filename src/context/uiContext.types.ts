export interface UIContextValue {
	isCartOpen: boolean;

	openCart: () => void;

	closeCart: () => void;

	toggleCart: () => void;
}