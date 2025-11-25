"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { TbHomeFilled, TbMenu, TbX } from "react-icons/tb";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link href="/"><div className="flex gap-1 items-center font-extrabold text-2xl text-blue-600 hover:text-blue-700 transition">
        <TbHomeFilled size={28} />
        TechMart
      </div></Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 items-center">
        <Link
          href="/courses"
          className="relative inline-block px-4 py-2 font-medium text-blue-600 rounded-full group overflow-hidden border-2 border-blue-600 hover:text-white transition"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition duration-300"></span>
          <span className="relative z-10">Courses</span>
        </Link>

        {user && (
          <Link
            href="/dashboard"
            className="relative inline-block px-4 py-2 font-medium text-blue-600 rounded-full group overflow-hidden border-2 border-blue-600 hover:text-white transition"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition duration-300"></span>
            <span className="relative z-10">Dashboard</span>
          </Link>
        )}

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

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        {/* Mobile Login/Logout Button */}
        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-blue-600 hover:text-blue-700"
        >
          {menuOpen ? <TbX size={28} /> : <TbMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-2 p-4 md:hidden z-40">
          <Link
            href="/courses"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 text-blue-600 font-medium rounded hover:bg-blue-50"
          >
            Courses
          </Link>

          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-blue-600 font-medium rounded hover:bg-blue-50"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
