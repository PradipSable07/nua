
# 🛍️ NUA — Mini E-Commerce Web App

A production-style mini e-commerce frontend built with **React 18 + TypeScript + Vite**, featuring product listing, variant selection, and a fully persistent cart system.

This project focuses on real-world frontend architecture, scalable state management, and clean UI/UX implementation.

---

## 🚀 Live Demo

👉 [https://nua-eta.vercel.app/](https://nua-eta.vercel.app/)

---

## 📦 Tech Stack

* React 18 + TypeScript
* Vite (build tool)
* React Router DOM
* Context API (Cart + UI state)
* SCSS Modules (no Tailwind / no CSS-in-JS)
* Fake Store API → [https://fakestoreapi.com](https://fakestoreapi.com)
* localStorage (cart persistence)

---

## 🧠 Key Features

### 🛍 Product Listing

* Responsive product grid
* Product cards with image, name, price
* Quick Add directly from listing
* Real-time cart quantity updates

### 📄 Product Detail Page

* Image gallery with thumbnails
* Variant selection (color + size)
* Stock-aware UI (available / low stock / sold out)
* Deep-linkable state via URL:

  ```
  /product/18?color=Black&size=S
  ```

### 🛒 Cart System

* Slide-in cart drawer
* Quantity update / remove items
* Subtotal calculation
* Persistent across refresh (localStorage)

### 🎯 Smart UX

* Prevents over-ordering based on stock
* Shows “Add More (X in cart)” state
* Auto-sync variant selection with URL
* Disabled states for sold-out variants

---

## 📁 Project Structure

```
src/
├── api/                 # API layer (Fake Store)
├── components/          # Reusable UI components
├── context/             # Cart + UI global state
├── hooks/               # Custom hooks (useCart, useUI)
├── pages/               # Route-level pages
├── router/              # App routing
├── services/            # localStorage + transformers
├── types/               # TypeScript models
├── utils/               # helpers (stock, etc.)
├── styles/              # global SCSS system
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/nua-ecommerce.git
cd nua-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

This project is optimized for Vercel.

### Steps:

1. Push repo to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import repository
4. Framework preset: **Vite**
5. Build command:

   ```
   npm run build
   ```
6. Output directory:

   ```
   dist
   ```

This ensures React Router works on refresh.

---

## 🧩 Design Decisions

### 1. Context API instead of Redux

Chosen for simplicity and readability. Cart logic is isolated and scalable enough for this scope.

### 2. localStorage persistence

Cart state persists across refresh without backend dependency.

### 3. Variant model strategy

Variants are pre-generated and resolved via:

* color + size matching
* fallback logic for invalid URL states

### 4. Stock-aware UX

Stock is enforced at UI level:

* disables buttons
* prevents over-add
* shows low-stock warnings

---

## ⚠️ Trade-offs

* No backend → cart is purely client-side
* Fake Store API has limited variant realism
* No authentication system
* No server-side cart sync

---

## 🔮 Future Improvements

If extended into a real production system:

* Backend cart sync (Redis / DB)
* User accounts + auth
* Payment integration (Stripe)
* Wishlist persistence
* Inventory management system
* Server-side rendering (Next.js migration)

---

## 🧪 Optional Enhancements (Not Implemented)

* Unit tests for variant selector
* Cart reducer testing
* API failure simulation
* Loading skeleton improvements

---

## 📸 Screenshots

*Add screenshots here*

---

## 👨‍💻 Author

Built as a frontend engineering exercise focusing on:

* scalable React architecture
* real-world UI state handling
* production-level component design

---
