import { cartReducer } from "./cartReducer";

describe("cartReducer", () => {
  it("should add item", () => {
    const state = { items: [] };

    const newState = cartReducer(state, {
      type: "ADD_ITEM",
      payload: {
        cartItemId: "1",
        productId: 1,
        name: "test",
        image: "",
        price: 10,
        quantity: 1,
        variant: { id: "v1", color: "Black", size: "M", stock: 5 },
      },
    });

    expect(newState.items.length).toBe(1);
  });
});