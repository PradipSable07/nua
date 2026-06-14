import type { CartItem } from "../types/cart";

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// 15% failure rate (real-world behavior simulation)
function shouldFail() {
  return Math.random() < 0.15;
}

export async function addToCartApi(item: CartItem): Promise<CartItem> {
  await delay(600 + Math.random() * 800);

  if (shouldFail()) {
    throw new Error("Network error. Please try again.");
  }

  return item;
}

export async function updateCartApi(): Promise<void> {
  await delay(300);

  if (shouldFail()) {
    throw new Error("Failed to update cart");
  }
}