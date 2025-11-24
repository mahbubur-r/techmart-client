"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top courses from API
  useEffect(() => {
    fetch("https://mentora-academy-server.vercel.app/courses")
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

      {/* ===== Top Courses Section ===== */}
      <section className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Courses</h2>

        {loading ? (
          <p className="text-center mt-10">Loading courses...</p>
        ) : (
          <>
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
                  <p className="text-gray-600 text-sm mb-2">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">Rating: {course.ratingAvg}</p>

                  {/* Details Button */}
                  <a
                    href={`/course/${course._id}`}
                    className="mt-auto bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition"
                  >
                    Details
                  </a>
                </div>
              ))}
            </div>

            {/* Show All Courses Button */}
            <div className="text-center mt-6">
              <a
                href="/courses"
                className="bg-blue-500 text-white py-2 px-6 rounded font-semibold hover:bg-blue-600 transition"
              >
                Show All Courses
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
