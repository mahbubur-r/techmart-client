"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const [placingOrder, setPlacingOrder] = useState(false);
    const router = useRouter();

    async function handleOrder() {
        const user = auth.currentUser;
        if (!user) {
            return Swal.fire({
                title: "Login Required",
                text: "You must be logged in to order.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
            });
        }

        // Prevent ordering your own product if you are the seller
        if (user.email === product.sellerEmail) {
            return Swal.fire({
                title: "Action Denied",
                text: "You cannot order your own product.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }

        const result = await Swal.fire({
            title: "Confirm Order",
            text: `Are you sure you want to order "${product.title}" for €${product.price}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, order it!"
        });

        if (!result.isConfirmed) return;

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

            const apiResult = await res.json();
            if (apiResult.insertedId) {
                await Swal.fire({
                    title: "Success!",
                    text: "Order placed successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                router.push("/dashboard");
            } else {
                throw new Error("Order failed");
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "Error placing order: " + err.message,
                icon: "error",
            });
        } finally {
            setPlacingOrder(false);
        }
    }

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative">
            {/* Discount Badge */}
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                -20%
            </div>

            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                        href={`/product/${product._id}`}
                        className="p-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors transform hover:-translate-y-1"
                        title="View Details"
                    >
                        <FaEye size={18} />
                    </Link>
                    <button
                        onClick={handleOrder}
                        disabled={placingOrder}
                        className={`p-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-emerald-500 hover:text-white transition-colors transform hover:-translate-y-1 ${placingOrder ? "opacity-50 cursor-not-allowed" : ""}`}
                        title="Add to Cart"
                    >
                        <FaShoppingCart size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                        {product.category}
                    </span>
                </div>

                <Link href={`/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 text-sm">
                        {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                                key={i}
                                className={i < Math.round(product.ratingAvg || 0) ? "fill-current" : "text-gray-200"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">({product.ratingAvg || 0})</span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-bold">Price</span>
                        <span className="text-xl font-bold text-gray-900">€{product.price}</span>
                    </div>
                    <Link
                        href={`/product/${product._id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-all"
                    >
                        View Details &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
