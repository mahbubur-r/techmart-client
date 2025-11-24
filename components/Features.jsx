export default function Features() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose TechMart?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
            <h3 className="text-xl font-semibold mb-2">High Quality Courses</h3>
            <p className="text-white/90">
              Learn from industry experts with hands-on projects and practical guidance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white">
            <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
            <p className="text-white/90">
              Access top courses at reasonable prices, and get the best value for your learning.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-gradient-to-br from-teal-400 to-teal-600 text-white">
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-white/90">
              Learn at your own pace, anytime, anywhere, on any device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
