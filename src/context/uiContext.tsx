import {
	createContext,
	useMemo,
	useState,
} from "react";

import type {
	ReactNode,
} from "react";

import type {
	UIContextValue,
} from "./uiContext.types";

const UIContext =
	createContext<
		UIContextValue | undefined
	>(undefined);

interface Props {
	children: ReactNode;
}

export function UIProvider({
	children,
}: Props) {
	const [isCartOpen, setIsCartOpen] =
		useState(false);

	const value = useMemo(
		() => ({
			isCartOpen,

			openCart: () =>
				setIsCartOpen(true),

			closeCart: () =>
				setIsCartOpen(false),

			toggleCart: () =>
				setIsCartOpen(
					(prev) => !prev
				),
		}),
		[isCartOpen]
	);

	return (
		<UIContext.Provider
			value={value}
		>
			{children}
		</UIContext.Provider>
	);
}

export default UIContext;