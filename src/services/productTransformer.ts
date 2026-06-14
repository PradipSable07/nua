import type { FakeStoreProduct } from "../types/api";
import type { Product } from "../types/product";

const COLORS = [
  "Black",
  "White",
  "Blue",
  "Red",
];

const SIZES = [
  "S",
  "M",
  "L",
  "XL",
];

export function transformProduct(
  apiProduct: FakeStoreProduct
): Product {
  return {
    id: apiProduct.id,

    name: apiProduct.title,

    brand: apiProduct.category,

    price: apiProduct.price,

    salePrice:
      apiProduct.id % 2 === 0
        ? Number((apiProduct.price * 0.8).toFixed(2))
        : undefined,

    description: apiProduct.description,

    images: [
      {
        id: "primary",
        url: apiProduct.image,
      },
      {
        id: "secondary",
        url: apiProduct.image,
      },
      {
        id: "third",
        url: apiProduct.image,
      },
    ],

    variants: generateVariants(apiProduct.id),
  };
}

function generateVariants(productId: number) {
  const variants = [];

  for (const color of COLORS) {
    for (const size of SIZES) {
      const stock =
        (productId * color.length * size.length) % 12;

      variants.push({
        id: `${productId}-${color}-${size}`,
        color,
        size,
        stock,
      });
    }
  }

  return variants;
}