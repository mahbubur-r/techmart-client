"use client";

import { useEffect, useState } from "react";

export default function AddCourseForm({ user, editingCourse = null, onCancel, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: "",
    price: "",
    description: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(editingCourse && editingCourse._id);

  // When editingCourse changes, populate the form
  useEffect(() => {
    if (editingCourse) {
      setForm({
        title: editingCourse.title || "",
        category: editingCourse.category || "",
        duration: editingCourse.duration || "",
        price: editingCourse.price || "",
        description: editingCourse.description || "",
        image: editingCourse.image || "",
      });
    } else {
      // reset if not editing
      setForm({
        title: "",
        category: "",
        duration: "",
        price: "",
        description: "",
        image: "",
      });
    }
  }, [editingCourse]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user?.email) return alert("You must be logged in to add a course.");

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
        // Update existing course (PUT)
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/add_new_courses/${editingCourse._id}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Add new course (POST)
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_new_courses`, {
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
      alert(isEditing ? "Course updated successfully!" : "Course added successfully!");
      onSaved?.(data);
      // reset form if it was add
      if (!isEditing) {
        setForm({
          title: "",
          category: "",
          duration: "",
          price: "",
          description: "",
          image: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.message || "Failed to save course"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded shadow mb-10 bg-white">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Update Course" : "Add New Course"}</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Course Title"
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
          name="duration"
          placeholder="Duration (e.g. 20 hours)"
          value={form.duration}
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
          {submitting ? (isEditing ? "Updating..." : "Saving...") : isEditing ? "Update Course" : "Add Course"}
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
