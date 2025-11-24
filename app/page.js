"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top courses from API
  useEffect(() => {
    // fetch("https://mentora-academy-server.vercel.app/courses")
    // fetch("http://localhost:3000/courses")
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.slice(0, 6)); // Take top 6 courses
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="bg-blue-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to TechMart</h1>
          <p className="text-lg mb-6">
            Learn top skills from industry experts. Choose your course and start learning today!
          </p>
          <button className="bg-white text-blue-500 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
