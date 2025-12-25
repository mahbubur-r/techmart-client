"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddProductForm({ user, editingProduct = null, onCancel, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(editingProduct && editingProduct._id);

  // When editingProduct changes, populate the form
  useEffect(() => {
    if (editingProduct) {
      setForm({
        title: editingProduct.title || "",
        category: editingProduct.category || "",
        brand: editingProduct.brand || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        image: editingProduct.image || "",
      });
    } else {
      // reset if not editing
      setForm({
        title: "",
        category: "",
        brand: "",
        price: "",
        description: "",
        image: "",
      });
    }
  }, [editingProduct]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user?.email) return Swal.fire("Error", "You must be logged in to add a product.", "error");

    setSubmitting(true);
    const payload = {
      ...form,
      name: user.displayName || user.email,
      email: user.email,
      photo: user.photoURL || "",
    };

    try {
      let res;
      if (isEditing) {
        // Update existing product (PUT)
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/added_products/${editingProduct._id}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Add new product (POST)
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/added_products`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || `Request failed (${res.status})`);
      }

      const data = await res.json();
      Swal.fire({
        title: "Success!",
        text: isEditing ? "Product updated successfully!" : "Product added successfully!",
        icon: "success",
        confirmButtonText: "Cool"
      });

      onSaved?.(data);
      // reset form if it was add
      if (!isEditing) {
        setForm({
          title: "",
          category: "",
          brand: "",
          price: "",
          description: "",
          image: "",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to save product", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded shadow mb-10 bg-white">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Update Product" : "Add New Product"}</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          rows={4}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        >
          {submitting ? (isEditing ? "Updating..." : "Saving...") : isEditing ? "Update Product" : "Add Product"}
        </button>

        <button
          type="button"
          onClick={() => {
            // cancel editing or collapse form
            onCancel?.();
          }}
          className="px-6 py-2 rounded border"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
