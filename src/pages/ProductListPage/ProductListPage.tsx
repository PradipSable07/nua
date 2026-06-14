import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import { useProducts } from "../../hooks/useProducts";

function ProductListPage() {
  const {
    products,
    loading,
    error,
  } = useProducts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />

      <Hero />

      <ProductGrid
        products={products}
      />
    </>
  );
}

export default ProductListPage;