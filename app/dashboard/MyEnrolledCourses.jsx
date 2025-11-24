"use client";

import { useEffect, useState } from "react";

export default function MyEnrolledCourses({ user }) {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // WAIT until user is loaded!!!

    async function load() {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/enrolledCourses?email=${encodeURIComponent(
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

        setEnrolled(normalized);
      } catch (e) {
        console.error("Error loading enrolled courses:", e);
        setEnrolled([]);
      }

      setLoading(false);
    }

    load();
  }, [user]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-3">My Enrolled Courses</h2>

      {loading && <p>Loading your enrolled courses...</p>}

      {!loading && enrolled.length === 0 && (
        <p className="text-gray-600">No enrolled courses yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {enrolled.map((course) => (
          <div key={course._id || course.id} className="border rounded shadow p-4">
            <img
              src={course.image}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-bold mb-1">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
