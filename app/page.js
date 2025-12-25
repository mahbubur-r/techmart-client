"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

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

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-28 px-4 overflow-hidden">
        {/* Optional floating shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse"></div>

        <div className="relative max-w-5xl mx-auto text-center">
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

      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
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

      <section className="max-w-6xl mx-auto mt-10 mb-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Products</h2>
        <div className="grid md:grid-cols-4 gap-6">
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
              <p className="text-gray-600 text-sm mb-2">Rating: {product.ratingAvg}</p>

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


      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">TechMart products are amazing! I found exactly what I needed.</p>
              <p className="font-semibold text-blue-600">— Sarah K.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">Great experience buying and selling on TechMart.</p>
              <p className="font-semibold text-blue-600">— Alex J.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">Reliable platform with high-quality products. Highly recommended.</p>
              <p className="font-semibold text-blue-600">— Priya M.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="mb-6">Join thousands of users and start trading today!</p>
        <Link
          href="/products"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Browse Products
        </Link>
      </section>
    </div>
  );
}
