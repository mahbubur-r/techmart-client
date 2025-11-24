"use client";

export default function ProductCard({ title, price }) {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="mb-2">{price}</p>
      <button className="btn btn-sm btn-primary">View Details</button>
    </div>
  );
}
