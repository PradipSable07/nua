import type { StockStatus } from "../types/product";

export function getStockStatus(
  stock: number
): StockStatus {
  if (stock === 0) {
    return "sold-out";
  }

  if (stock <= 5) {
    return "low-stock";
  }

  return "available";
}