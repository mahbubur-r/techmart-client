export default function Testimonials() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">TechMart courses helped me get my first job as a developer!</p>
            <p className="font-semibold text-blue-600">— Sarah K.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">The platform is easy to use and the content is excellent.</p>
            <p className="font-semibold text-blue-600">— Alex J.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">Affordable flexible, and high-quality. Highly recommended.</p>
            <p className="font-semibold text-blue-600">— Priya M.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
