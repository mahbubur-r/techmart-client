"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { auth } from "../../firebase";

export default function ManageProductsPage() {
  const router = useRouter();
  const [userChecked, setUserChecked] = useState(false);
  const [products, setProducts] = useState([]);

  // Protect page
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUserChecked(true); // user is logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch products only if user is logged in
  useEffect(() => {
    if (!userChecked) return;

    fetch(process.env.NEXT_PUBLIC_API + "/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [userChecked]);

  if (!userChecked) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} title={p.title} price={p.price} />
        ))}
      </div>
    </div>
  );
}
