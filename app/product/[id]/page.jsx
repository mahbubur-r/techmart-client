"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "../../../firebase";
import Swal from "sweetalert2";
import Loading from "@/components/Loading";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Protect page & Get User
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(currentUser);
        setAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch product details after auth check
  useEffect(() => {
    if (!authChecked) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [authChecked, productId]);

  async function handleOrder() {
    if (!user) return alert("You must be logged in to order.");

    // Optional: Prevent ordering your own product if you are the seller
    if (user.email === product.sellerEmail) {
      return alert("You cannot order your own product.");
    }

    if (!confirm(`Are you sure you want to order "${product.title}" for $${product.price}?`)) {
      return;
    }

    setPlacingOrder(true);

    const orderData = {
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      seller: product.seller,
      sellerEmail: product.sellerEmail,
      userEmail: user.email,
      userName: user.displayName || user.email,
      orderDate: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const result = await res.json();
      if (result.insertedId) {
        alert("Order placed successfully!");
        router.push("/dashboard"); // Redirect to orders page
      } else {
        throw new Error("Order failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order: " + err.message);
    } finally {
      setPlacingOrder(false);
    }
  }

  if (!authChecked || loading) return <Loading />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow bg-white mb-10">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-cover rounded mb-6"
      />

      <div className="mb-8">
        <p className="text-gray-600 mb-2"><strong>Category:</strong> {product.category}</p>
        <p className="text-gray-800 font-medium mb-2 text-xl"><strong>Price:</strong> ${product.price}</p>
        <p className="text-gray-500 mb-2"><strong>Brand:</strong> {product.brand}</p>
        <p className="text-gray-600 mb-2"><strong>Seller:</strong> {product.seller}</p>
        <p className="text-gray-600 mb-2"><strong>Seller Email:</strong> {product.sellerEmail}</p>
        <p className="text-gray-600 mb-2"><strong>Rating:</strong> {product.ratingAvg} ({product.reviews} reviews)</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description || product.courseDetails}</p>
      </div>

      <div className="mt-8">
        <button
          onClick={handleOrder}
          disabled={placingOrder}
          className="w-full bg-blue-600 text-white text-lg font-bold py-3 px-6 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {placingOrder ? "Placing Order..." : "Order Now"}
        </button>
      </div>
    </div>
  );
}
