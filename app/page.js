"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaShippingFast, FaHeadset, FaUndo, FaStar, FaEnvelope } from "react-icons/fa";
import Loading from "@/components/Loading";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top products from API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/top-products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // Take top products
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-28 px-4 overflow-hidden">
        {/* Optional floating shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse"></div>

        <div className="relative max-w-screen-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-400">TechMart</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            Discover and manage top products with ease. Sell, add, and grow your business all in one place!
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="/products"
              className="px-8 py-3 font-semibold rounded-full bg-yellow-400 text-blue-800 hover:bg-yellow-300 hover:scale-105 transform transition"
            >
              Explore Products
            </a>
            <a
              href="/dashboard"
              className="px-8 py-3 font-semibold rounded-full bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transform transition"
            >
              My Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', color: 'from-blue-500 to-indigo-600' },
              { name: 'Fashion', color: 'from-pink-500 to-rose-500' },
              { name: 'Home & Living', color: 'from-green-500 to-emerald-600' },
              { name: 'Sports', color: 'from-orange-500 to-red-500' },
              { name: 'Books', color: 'from-purple-500 to-violet-600' },
              { name: 'Toys', color: 'from-yellow-400 to-amber-500' },
              { name: 'Beauty', color: 'from-teal-400 to-cyan-500' },
              { name: 'Automotive', color: 'from-slate-600 to-gray-700' },
            ].map((cat, idx) => (
              <Link key={idx} href="/products">
                <div
                  className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br ${cat.color} text-white flex items-center justify-center h-full`}
                >
                  <h3 className="font-bold text-xl tracking-wide">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose TechMart?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
              <h3 className="text-xl font-semibold mb-2">High Quality Products</h3>
              <p className="text-white/90">
                Get the best quality products with verified sellers and excellent support.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white">
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-white/90">
                Access top products at competitive prices, and get the best value for your money.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-gradient-to-br from-teal-400 to-teal-600 text-white">
              <h3 className="text-xl font-semibold mb-2">Easy Selling</h3>
              <p className="text-white/90">
                Sell your products effortlessly, anytime, anywhere, on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-10 px-4">
        <div className="max-w-screen-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale is Live!</h2>
          <p className="text-lg opacity-90 mb-6">Get up to 50% off on selected electronics and gadgets. Limited time offer.</p>
          <Link href="/products" className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto mt-10 mb-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded shadow p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-800 font-medium mb-2">${product.price}</p>
              <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
              <p className="text-gray-600 text-sm mb-2">Seller: {product.seller}</p>
              <div className="flex items-center text-yellow-500 mb-2">
                <span className="text-gray-600 text-sm mr-2">Rating:</span>
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className={i < Math.round(product.ratingAvg || 0) ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="ml-1 text-gray-500 text-xs">({product.ratingAvg})</span>
              </div>

              <Link
                href={`/product/${product._id}`}
                className="mt-auto bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition"
              >
                Details
              </Link>
            </div>
          ))}
        </div>

        {/* Show All Products Button */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-7 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:from-indigo-500 hover:to-blue-600"
          >
            Show All Products
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">&quot;TechMart products are amazing! I found exactly what I needed at a great price.&quot;</p>
              <p className="font-semibold text-blue-600">— Sarah K.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">&quot;Great experience buying and selling on TechMart. The dashboard is super helpful.&quot;</p>
              <p className="font-semibold text-blue-600">— Alex J.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">&quot;Reliable platform with high-quality products. Highly recommended to everyone!&quot;</p>
              <p className="font-semibold text-blue-600">— Priya M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg flex items-center gap-2"><FaShippingFast className="text-blue-500" /> How fast is shipping?</h3>
              <p className="text-gray-600 mt-2 ml-7">We offer standard (3-5 days) and express (1-2 days) shipping options for all orders.</p>
            </div>
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg flex items-center gap-2"><FaUndo className="text-green-500" /> Can I return products?</h3>
              <p className="text-gray-600 mt-2 ml-7">Yes, we have a 30-day hassle-free return policy for verified purchases.</p>
            </div>
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg flex items-center gap-2"><FaHeadset className="text-purple-500" /> Is support available?</h3>
              <p className="text-gray-600 mt-2 ml-7">Our support team is available 24/7 to assist you with any queries or issues.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Flash Stats Section */}
      <section className=" text-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-400">10k+</h3>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-purple-400">50k+</h3>
            <p className="text-gray-400">Products Sold</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-400">99%</h3>
            <p className="text-gray-400">Satisfaction</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-400">24/7</h3>
            <p className="text-gray-400">Support</p>
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-10 text-white text-center">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 text-lg opacity-90">Join thousands of users and start trading today!</p>
          <Link
            href="/products"
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition inline-block"
          >
            Browse Products
          </Link>
        </div>
      </section>
      {/*Newsletter Section */}
      <section className="bg-gray-900 text-white pb-10">
        <div className="max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><FaEnvelope /> Subscribe to our Newsletter</h2>
            <p className="text-gray-400">Get the latest updates, offers, and tech news directly in your inbox.</p>
          </div>
          <div className="md:w-1/2 w-full flex gap-2">
            <input type="email" placeholder="Enter your email" className="w-full p-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
