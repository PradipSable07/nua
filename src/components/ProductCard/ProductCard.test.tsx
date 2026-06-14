import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import ProductCard from "./ProductCard";
import { screen } from "@testing-library/react";

describe("ProductCard", () => {
  it("disables Quick Add when out of stock", () => {
    const product = {
      id: 1,
      name: "Test Product",
      brand: "Brand",
      price: 100,
      images: [{ url: "test.jpg" }],
      variants: [{ id: "v1", color: "Black", size: "S", stock: 0 }],
    };

    renderWithProviders(<ProductCard product={product as any} />);

    const button = screen.getByRole("button", {
      name: /sold out/i,
    });

    expect(button).toBeDisabled();
  });
});