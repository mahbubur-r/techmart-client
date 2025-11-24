import ProductCard from "@/components/ProductCard";

export default function ProductListPage({ products }) {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Example static products */}
        <ProductCard title="Product 1" price="$10" />
        <ProductCard title="Product 2" price="$20" />
        <ProductCard title="Product 3" price="$30" />
      </div>
    </div>
  );
}
