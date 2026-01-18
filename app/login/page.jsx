"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      if (email === "test@techmart.com" && password === "password") {
        const mockUser = {
          uid: "mock-user-123",
          email: "test@techmart.com",
          displayName: "Test User",
          photoURL: "https://ui-avatars.com/api/?name=Test+User", // specific mock data
          role: "user"
        };
        localStorage.setItem("mockUser", JSON.stringify(mockUser));

        // Dispatch a custom event to update Navbar immediately
        window.dispatchEvent(new Event("storage"));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful (Mock)",
          showConfirmButton: false,
          timer: 1500
        });
        router.push("/");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/"); // redirect after login
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // save user to backend
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          image: result.user.photoURL,
          role: "user",
        }),
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google Login Successful",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/"); // redirect after login
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />
      <button
        onClick={handleEmailLogin}
        className="w-full bg-blue-500 text-white py-2 rounded mb-2"
      >
        Login
      </button>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white py-2 rounded mb-4"
      >
        Login with Google
      </button>

      <p>
        Dont have an account?{" "}
        <Link href="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
}
