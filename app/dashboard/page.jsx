"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import Link from "next/link";
import AddProductForm from "./AddProductForm";
import MyAddedProducts from "./MyAddedProducts";
import MyOrders from "./MyOrders";
import Profile from "./Profile";


export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/login");
      } else {
        setUser(u);
      }
    });
    return () => unsub();
  }, [router]);

  function handleSavedProduct(savedProduct) {
    setRefreshFlag((s) => s + 1);
    setEditingProduct(null);
    setShowForm(false);
  }

  function handleEditRequest(product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleDeleted() {
    setRefreshFlag((s) => s + 1);
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Profile Section */}
      <Profile user={user} />

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            setShowForm((s) => !s);
            setEditingProduct(null);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:opacity-95 transition"
        >
          {showForm ? "Close Form" : "Add New Product"}
        </button>

        {editingProduct && (
          <div className="text-sm text-gray-600">
            Editing: <span className="font-medium">{editingProduct.title}</span>
          </div>
        )}
      </div>

      {showForm && (
        <AddProductForm
          user={user}
          editingProduct={editingProduct}
          onCancel={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
          onSaved={handleSavedProduct}
        />
      )}

      {/* Orders */}
      <MyOrders user={user} />

      {/* Added Products */}
      <MyAddedProducts
        user={user}
        onEdit={handleEditRequest}
        onDeleted={handleDeleted}
        refreshFlag={refreshFlag}
      />
    </div>
  );
}
