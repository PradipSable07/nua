export type StockStatus =
  | "available"
  | "low-stock"
  | "sold-out";

  export type ProductType =
  | "fashion"
  | "generic";
export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface Product {
  id: number;

  name: string;

  brand: string;

  type: ProductType;

  price: number;

  salePrice?: number;

  description: string;

  images: ProductImage[];

  variants: ProductVariant[];
}