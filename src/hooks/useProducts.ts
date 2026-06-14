import { useEffect, useState } from "react";

import { getProducts } from "../api/products";

import type { Product } from "../types/product";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const data =
          await getProducts();

        setProducts(data);
      } catch {
        setError(
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}