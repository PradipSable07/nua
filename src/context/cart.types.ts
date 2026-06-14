import type { CartItem } from "../types/cart";

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: CartItem;
    }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        cartItemId: string;
        quantity: number;
      };
    }
  | {
      type: "CLEAR_CART";
    };