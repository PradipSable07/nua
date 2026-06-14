import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/test-utils";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  it("shows Sold Out when stock is 0", () => {
    const product = {
      id: 1,
      name: "Test",
      brand: "Brand",
      price: 100,
      images: [{ url: "https://test.com/img.png" }], // ⚠️ FIXED (no empty string)
      variants: [{ id: "v1", color: "Black", size: "S", stock: 0 }],
    };

    renderWithProviders(<ProductCard product={product as any} />);

    expect(screen.getByText("Sold Out")).toBeDisabled();
  });
});