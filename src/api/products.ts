import type { Product } from "../types/product";
import type { FakeStoreProduct } from "../types/api";

import { transformProduct } from "../services/productTransformer";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: FakeStoreProduct[] =
    await response.json();

  return data.map(transformProduct);
}

export async function getProduct(
  id: string
): Promise<Product> {
  const response = await fetch(
    `${BASE_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data: FakeStoreProduct =
    await response.json();

  return transformProduct(data);
}