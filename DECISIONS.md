## 📄 DECISIONS.md

### 1. Architectural Decision: Context API + useReducer vs Redux

I chose React Context API combined with `useReducer` for global state management instead of Redux or other external state libraries.

The main reason was the scope of the application. This is a medium-complexity e-commerce frontend where state is primarily limited to cart management and UI state (cart drawer visibility, selected variants, and persistence). Introducing Redux would add unnecessary boilerplate without providing significant benefits at this scale.

Using `useReducer` allowed me to keep state transitions explicit and predictable, especially for cart operations like ADD_ITEM, REMOVE_ITEM, and UPDATE_QUANTITY. Wrapping this with Context enabled clean global access without prop drilling while keeping the architecture lightweight.

Additionally, separating cart logic into a reducer improved maintainability and made it easier to enforce business rules such as stock constraints and quantity limits.

---

### 2. Product Variant and URL Synchronization Strategy

One key architectural decision was to bind product variants (color + size) directly to the URL using query parameters.

This approach ensures:

* Deep linking support for specific product configurations
* Page state persistence on refresh
* Shareable product URLs
* Decoupling UI state from internal component state

To handle edge cases (invalid or missing query parameters), I implemented a `resolveVariant` function that safely falls back to:

1. Exact match (color + size)
2. Same color with available stock
3. Any available variant
4. First fallback variant

This ensures the UI never breaks even with invalid URLs.

---

### 3. Cart Design and Persistence

Cart state is persisted in `localStorage` to ensure data survives page refreshes.

Each cart item is uniquely identified by a `variant.id`, ensuring that different product variants are treated independently.

A key improvement was enforcing stock safety at the cart level, not just the UI level. This prevents users from exceeding available inventory even through direct manipulation or multiple entry points (Product Card and Product Detail Page).

---

### 4. Trade-offs and What I Would Improve

If I had more time, I would improve the following areas:

* Introduce server-side cart validation (currently fully client-driven)
* Add proper async handling for cart actions with optimistic UI updates
* Improve accessibility (ARIA roles for variant selection and cart drawer focus trap)
* Add unit tests for reducer logic (especially stock constraints and quantity limits)
* Improve mobile UX for variant selection and cart drawer interactions

I would also consider extracting variant logic into a dedicated domain service layer if the application scales further.

---

### 5. Summary

The architecture prioritizes simplicity, predictability, and scalability. Context + reducer provides enough structure for this scope while keeping the codebase lightweight. Variant handling and URL synchronization were designed carefully to ensure a resilient, production-like user experience.
