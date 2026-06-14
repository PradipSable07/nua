import type { CartItem } from "../types/cart";

export interface CartContextValue {
  items: CartItem[];

  totalItems: number;

  subtotal: number;

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    cartItemId: string
  ) => void;

  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}