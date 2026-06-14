import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VariantSelector from "./VariantSelector";

const mockVariants = [
  { id: "1", color: "Black", size: "S", stock: 0 },
  { id: "2", color: "Black", size: "M", stock: 5 },
];

describe("VariantSelector", () => {
  it("disables sold-out sizes", () => {
    render(
      <VariantSelector
        variants={mockVariants}
        selectedColor="Black"
        selectedSize="S"
        onColorChange={() => {}}
        onSizeChange={() => {}}
      />
    );

    const soldOutButton = screen.getByText("S");
    expect(soldOutButton).toBeDisabled();
  });

  it("shows low stock label", () => {
    render(
      <VariantSelector
        variants={mockVariants}
        selectedColor="Black"
        selectedSize="M"
        onColorChange={() => {}}
        onSizeChange={() => {}}
      />
    );

    expect(screen.getByText("Low Stock")).toBeInTheDocument();
  });
});