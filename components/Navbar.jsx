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
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        TechMart
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/courses" className="hover:text-blue-600">
          Courses
        </Link>

        <Link href="/products" className="hover:text-blue-600">
          Products
        </Link>

        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="btn btn-sm btn-primary"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
