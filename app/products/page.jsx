"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Protect page
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // redirect if not logged in
      } else {
        setAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch products after auth check
  useEffect(() => {
    if (!authChecked) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [authChecked]);

  if (!authChecked || loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>
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
            <p className="text-gray-600 text-sm mb-2">Rating: {product.ratingAvg}</p>
            <a
              href={`/product/${product._id}`}
              className="mt-auto bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition"
            >
              Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
