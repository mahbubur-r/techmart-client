"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/"
        className="font-extrabold text-2xl text-blue-600 hover:text-blue-700 transition"
      >
        TechMart
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center">
        {/* Products Button */}
        <Link
          href="/"
          className="relative inline-block px-4 py-2 font-medium text-blue-600 rounded-full group overflow-hidden border-2 border-blue-600 hover:text-white transition"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition duration-300"></span>
          <span className="relative z-10">Home</span>
        </Link>
        
        {/* Courses Button */}
        <Link
          href="/courses"
          className="relative inline-block px-4 py-2 font-medium text-blue-600 rounded-full group overflow-hidden border-2 border-blue-600 hover:text-white transition"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition duration-300"></span>
          <span className="relative z-10">Courses</span>
        </Link>

        {/* Conditional Login / Logout */}
        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
