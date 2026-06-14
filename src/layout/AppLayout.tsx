import { Outlet } from "react-router-dom";
import CartDrawer from "../components/CartDrawer/CartDrawer";

export default function AppLayout() {
  return (
    <>
      <Outlet />
      <CartDrawer />
    </>
  );
}