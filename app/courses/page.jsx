"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

export default function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Protect page
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // redirect if not logged in
      } else {
        setAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch courses after auth check
  useEffect(() => {
    if (!authChecked) return;

    fetch("https://mentora-academy-server.vercel.app/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [authChecked]);

  if (!authChecked || loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Courses</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded shadow p-4 flex flex-col hover:shadow-lg transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.category}</p>
            <p className="text-gray-800 font-medium mb-2">${course.price}</p>
            <p className="text-gray-500 text-sm mb-2">{course.duration}</p>
            <p className="text-gray-600 text-sm mb-2">Instructor: {course.instructor}</p>
            <p className="text-gray-600 text-sm mb-2">Rating: {course.ratingAvg}</p>
            <a
              href={`/course/${course._id}`}
              className="mt-auto bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition"
            >
              Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
