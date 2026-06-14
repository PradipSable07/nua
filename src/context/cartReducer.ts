import type { CartState } from "../types/cart";
import type { CartAction } from "./cart.types";

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) =>
          item.productId ===
            action.payload.productId &&
          item.variant.id ===
            action.payload.variant.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.cartItemId ===
            existingItem.cartItemId
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    action.payload.quantity,
                }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          action.payload,
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) =>
            item.cartItemId !==
            action.payload
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.cartItemId ===
          action.payload.cartItemId
            ? {
                ...item,
                quantity:
                  action.payload.quantity,
              }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        items: [],
      };

    default:
      return state;
  }
}