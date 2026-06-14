import { createBrowserRouter } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
]);