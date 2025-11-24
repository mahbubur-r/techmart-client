export default function ProductDetailsPage({ params }) {
  const { id } = params;
  // Normally fetch product by ID from API
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">Product {id}</h1>
      <p className="mb-2">Full product description here...</p>
      <p className="font-bold">Price: $10</p>
    </div>
  );
}
