import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { UIProvider } from "./context/uiContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UIProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</UIProvider>
	</StrictMode>,
);
