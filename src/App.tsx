import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CartDrawer from "./components/CartDrawer/CartDrawer";

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<CartDrawer />
		</>
	);
}

export default App;
