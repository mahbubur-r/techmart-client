"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // WAIT until user is loaded!!!

    async function load() {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${encodeURIComponent(
            user.email
          )}`
        );

        const data = await res.json();

        // Normalize → ALWAYS array
        const normalized = Array.isArray(data)
          ? data
          : data == null
            ? []
            : [data];

        setOrders(normalized);
      } catch (e) {
        console.error("Error loading orders:", e);
        setOrders([]);
      }

      setLoading(false);
    }

    load();
  }, [user]);

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

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success || data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
          const remaining = orders.filter(odr => (odr._id || odr.id) !== id);
          setOrders(remaining);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the order.",
          icon: "error"
        });
      }
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {loading && <p>Loading your orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-600">No orders yet.</p>
      )}

      {/* Desktop Table */}
      {!loading && orders.length > 0 && (
        <>
          <div className="hidden md:block overflow-x-auto border rounded-lg shadow-md">
            <table className="min-w-full text-left divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr className="text-gray-700">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id || order.id} className="hover:bg-blue-50 transition">
                    <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                      <img
                        src={order.image}
                        alt={order.title}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md shadow flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold truncate max-w-xs">{order.title}</h3>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{order.brand}</p>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700 whitespace-nowrap">{order.category}</td>
                    <td className="p-3 font-medium text-blue-600 whitespace-nowrap text-lg">€{order.price}</td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-500">
                      #{order._id ? order._id.slice(-6).toUpperCase() : 'N/A'}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(order._id || order.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                        title="Delete Order"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4 mt-4">
            {orders.map((order) => (
              <div
                key={order._id || order.id}
                className="border rounded-lg shadow p-4 flex flex-col gap-2 bg-white"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={order.image}
                    alt={order.title}
                    className="w-20 h-20 object-cover rounded-md shadow flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{order.title}</h3>
                    <p className="text-sm text-gray-600">{order.category}</p>
                    <p className="text-gray-700 mt-1">{order.brand}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-medium text-blue-600">€{order.price}</p>
                      <button
                        onClick={() => handleDelete(order._id || order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition flex items-center gap-1"
                      >
                        <FaTrash size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
