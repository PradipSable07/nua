import type { CartState } from "../types/cart";
import { CART_STORAGE_KEY } from "../data/cart";

export function saveCart(
  cart: CartState
): void {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );
}

export function loadCart(): CartState {
  try {
    const data = localStorage.getItem(
      CART_STORAGE_KEY
    );

    if (!data) {
      return { items: [] };
    }

    return JSON.parse(data);
  } catch {
    return { items: [] };
  }
}