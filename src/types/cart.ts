import type { ProductVariant } from "./product";

export interface CartItem {
  cartItemId: string;

  productId: number;

  name: string;

  image: string;

  price: number;

  quantity: number;

  variant: ProductVariant;
}

export interface CartState {
  items: CartItem[];
}