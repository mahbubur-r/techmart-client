"use client";

import { useState } from "react";

export default function ProductForm() {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    image: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_API + "/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Product added!");
    setForm({ title: "", shortDescription: "", description: "", price: "", image: "" });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        value={form.title}
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input input-bordered"
      />
      <input
        value={form.shortDescription}
        placeholder="Short Description"
        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
        className="input input-bordered"
      />
      <textarea
        value={form.description}
        placeholder="Full Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="textarea textarea-bordered"
      />
      <input
        value={form.price}
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="input input-bordered"
      />
      <input
        value={form.image}
        placeholder="Image URL"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="input input-bordered"
      />
      <button className="btn btn-primary mt-4">Submit</button>
    </form>
  );
}
