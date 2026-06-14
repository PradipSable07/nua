# 🛍️ NUA — Mini E-Commerce Web App

A production-style frontend e-commerce application built with **React 18 + TypeScript + Vite**.  
It demonstrates scalable frontend architecture, real-world cart logic, variant handling, and UI state management.

This project is designed as a **frontend engineering case study**, focusing on architecture, state modeling, and UX decisions.

---

##  Live Demo

 https://nua-eta.vercel.app/

---

##  Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- React Router DOM
- Context API + useReducer
- SCSS Modules
- LocalStorage persistence
- Fake Store API

---

##  Key Features

### Product Listing
- Responsive product grid
- Quick Add from listing page
- Real-time cart updates
- Stock-aware UI states

---

###  Product Detail Page
- Image gallery support
- Variant selection (color + size)
- URL-driven state management:
```

/product/18?color=Black&size=S

```
- Safe fallback for invalid URLs

---

###  Cart System
- Slide-in cart drawer
- Quantity increase/decrease
- Remove items
- Persistent cart (localStorage)
- Stock-safe cart logic

---

###  UX Enhancements
- Prevents over-ordering based on stock
- Dynamic button states:
- Quick Add
- Adding...
- Sold Out
- Max Reached
- Low-stock indicators
- Deep-linkable product state

---

##  Project Structure

```

src/
├── api/              # API layer
├── components/       # UI components
├── context/          # Global state (Cart)
├── hooks/            # Custom hooks
├── pages/            # Route pages
├── router/           # Routing config
├── services/         # storage + helpers
├── types/            # TypeScript types
├── utils/            # utility functions
├── styles/           # global styles
├── test/             # test utilities

````

---

##  Setup & Installation

```bash
git clone https://github.com/your-username/nua-ecommerce.git
cd nua-ecommerce
npm install
npm run dev
````

App runs at:

```
http://localhost:5173
```

---

##  Production Build

```bash
npm run build
npm run preview
```

---

##  Testing Strategy

This project uses **Vitest + React Testing Library**.

###  What is tested

#### 1. Cart Reducer (Logic Layer)

* Add item to cart
* Update quantity
* Remove item
* Ensures stock-safe operations

---

#### 2. VariantSelector (UI Logic)

* Disables sold-out sizes
* Shows low-stock indicators
* Validates variant selection behavior

---

#### 3. ProductCard (UI Behavior)

* Renders product data correctly
* Disables Quick Add when out of stock
* Switches UI between:

  * Quick Add
  * Quantity controls

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import into Vercel
3. Framework preset: Vite
4. Build command:

   ```
   npm run build
   ```
5. Output:

   ```
   dist
   ```

---

##  Architecture Decisions

See [`DECISIONS.md`](./DECISIONS.md)

---

##  Trade-offs

* No backend (client-only cart)
* No authentication system
* Fake API has limited realism
* No server-side validation

---

##  Future Improvements

* Backend cart sync (Node/Redis/DB)
* Authentication system
* Stripe integration
* Wishlist feature
* MSW API mocking for tests
* Move to Next.js for SSR

---

##  Author

Frontend engineering project focused on:

* scalable React architecture
* state modeling with reducers
* real-world UI behavior
* production-level component design

