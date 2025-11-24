"use client";

import { useEffect, useState } from "react";

export default function MyAddedCourses({ user, onEdit, onDeleted, refreshFlag = 0 }) {
    const [addedCourses, setAddedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // load when user or refreshFlag changes
    useEffect(() => {
        if (!user?.email) return;
        let mounted = true;
        setLoading(true);
        setError(null);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/add_new_courses?email=${encodeURIComponent(
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
                    setAddedCourses(normalized);
                    setLoading(false);
                }
            } catch (err) {
                console.error("MyAddedCourses fetch error:", err);
                if (mounted) {
                    setError(err.message || "Failed to load");
                    setAddedCourses([]);
                    setLoading(false);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [user, refreshFlag]);

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_new_courses/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || err.message || `Delete failed (${res.status})`);
            }
            // notify parent to refresh (or simply increment local state)
            onDeleted?.();
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete: " + (err.message || ""));
        }
    }

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">My Added Courses</h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto border rounded-lg shadow-md">
                <table className="min-w-full text-left divide-y divide-gray-200">
                    <thead className="bg-blue-50">
                        <tr className="text-gray-700">
                            <th className="p-3">Course</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {addedCourses.map((course) => (
                            <tr key={course._id} className="hover:bg-blue-50 transition">
                                <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md shadow flex-shrink-0"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold truncate max-w-xs">{course.title}</h3>
                                        <p className="text-sm text-gray-600 truncate max-w-xs">{course.category}</p>
                                    </div>
                                </td>
                                <td className="p-3 text-gray-700 whitespace-nowrap">{course.duration}</td>
                                <td className="p-3 font-medium text-blue-600 whitespace-nowrap">${course.price}</td>
                                <td className="p-3 whitespace-nowrap">
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => onEdit?.(course)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course._id)}
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
                {addedCourses.map((course) => (
                    <div
                        key={course._id}
                        className="border rounded-lg shadow p-4 flex flex-col gap-2 bg-white"
                    >
                        <div className="flex gap-3 items-center">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-20 h-20 object-cover rounded-md shadow flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{course.title}</h3>
                                <p className="text-sm text-gray-600">{course.category}</p>
                                <p className="text-gray-700 mt-1">{course.duration}</p>
                                <p className="font-medium text-blue-600">${course.price}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <button
                                onClick={() => onEdit?.(course)}
                                className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(course._id)}
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
