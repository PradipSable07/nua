import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import { useProducts } from "../../hooks/useProducts";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import EmptyState from "../../components/EmptyState/EmptyState";

function ProductListPage() {
	const { products, loading, error } = useProducts();

	if (loading) {
		return (
			<>
				<Navbar />
				<LoadingSkeleton />
			</>
		);
	}

	if (error) {
		return (
			<>
				<Navbar />

				<EmptyState title='Something went wrong' description={error} />
			</>
		);
	}
	if (!products.length) {
		return (
			<>
				<Navbar />

				<EmptyState
					title='No products found'
					description='Please check back later.'
				/>
			</>
		);
	}

	return (
		<>
			<Navbar />

			<Hero />

			<ProductGrid products={products} />
		</>
	);
}

export default ProductListPage;
