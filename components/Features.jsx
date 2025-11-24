export default function Features() {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Why MiniMart?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold">Fast Delivery</h3>
          <p>Receive products quickly.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold">Quality Products</h3>
          <p>Only the best items available.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold">Easy Returns</h3>
          <p>Hassle-free returns anytime.</p>
        </div>
      </div>
    </section>
  );
}
