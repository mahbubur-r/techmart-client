"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyAddedProducts({ user, onEdit, onDeleted, refreshFlag = 0 }) {
    const [addedProducts, setAddedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // load when user or refreshFlag changes
    useEffect(() => {
        if (!user?.email) return;
        let mounted = true;
        setLoading(true);
        setError(null);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/added_products?email=${encodeURIComponent(
            user.email
        )}`;

        (async function load() {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.error || err.message || `Request failed (${res.status})`);
                }
                const data = await res.json();
                let normalized = [];
                if (Array.isArray(data)) normalized = data;
                else if (data == null) normalized = [];
                else if (typeof data === "object") normalized = [data];
                if (mounted) {
                    setAddedProducts(normalized);
                    setLoading(false);
                }
            } catch (err) {
                console.error("MyAddedProducts fetch error:", err);
                if (mounted) {
                    setError(err.message || "Failed to load");
                    setAddedProducts([]);
                    setLoading(false);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [user, refreshFlag]);

    async function handleDelete(id) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/added_products/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || err.message || `Delete failed (${res.status})`);
            }
            // notify parent to refresh (or simply increment local state)
            Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
            });
            onDeleted?.();
        } catch (err) {
            console.error("Delete error:", err);
            Swal.fire("Error", "Failed to delete: " + (err.message || ""), "error");
        }
    }

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">My Added Products</h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto border rounded-lg shadow-md">
                <table className="min-w-full text-left divide-y divide-gray-200">
                    <thead className="bg-blue-50">
                        <tr className="text-gray-700">
                            <th className="p-3">Product</th>
                            <th className="p-3">Brand</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {addedProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-blue-50 transition">
                                <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md shadow flex-shrink-0"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold truncate max-w-xs">{product.title}</h3>
                                        <p className="text-sm text-gray-600 truncate max-w-xs">{product.category}</p>
                                    </div>
                                </td>
                                <td className="p-3 text-gray-700 whitespace-nowrap">{product.brand}</td>
                                <td className="p-3 font-medium text-blue-600 whitespace-nowrap">${product.price}</td>
                                <td className="p-3 whitespace-nowrap">
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => onEdit?.(product)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
                {addedProducts.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg shadow p-4 flex flex-col gap-2 bg-white"
                    >
                        <div className="flex gap-3 items-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-20 h-20 object-cover rounded-md shadow flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{product.title}</h3>
                                <p className="text-sm text-gray-600">{product.category}</p>
                                <p className="text-gray-700 mt-1">{product.brand}</p>
                                <p className="font-medium text-blue-600">${product.price}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <button
                                onClick={() => onEdit?.(product)}
                                className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}
