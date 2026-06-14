import { createBrowserRouter } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import AppLayout from "../layout/AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProductListPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);