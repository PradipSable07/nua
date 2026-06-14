import type { FakeStoreProduct } from "../types/api";

import type {
  Product,
  ProductType,
  ProductVariant,
} from "../types/product";

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
  const productType =
    getProductType(
      apiProduct.category
    );

  return {
    id: apiProduct.id,

    name: apiProduct.title,

    brand: apiProduct.category,

    type: productType,

    price: apiProduct.price,

    salePrice:
      apiProduct.id % 2 === 0
        ? Number(
            (
              apiProduct.price *
              0.8
            ).toFixed(2)
          )
        : undefined,

    description:
      apiProduct.description,

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

    variants:
      productType ===
      "fashion"
        ? generateVariants(
            apiProduct.id
          )
        : [],
  };
}

function getProductType(
  category: string
): ProductType {
  const fashionCategories = [
    "men's clothing",
    "women's clothing",
  ];

  return fashionCategories.includes(
    category
  )
    ? "fashion"
    : "generic";
}

function generateVariants(
  productId: number
): ProductVariant[] {
  const variants: ProductVariant[] =
    [];

  for (const color of COLORS) {
    for (const size of SIZES) {
      const stock =
        (productId *
          color.length *
          size.length) %
        12;

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