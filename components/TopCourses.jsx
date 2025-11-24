"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function TopCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
            .then((res) => res.json())
            .then((data) => {
                setCourses(data.slice(0, 6)); // Top 6
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading courses...</p>;

    return (
        <section className="max-w-6xl mx-auto mt-10 mb-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Top Courses</h2>
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

                        <Link
                            href={`/course/${course._id}`}
                            className="mt-auto bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600 transition"
                        >
                            Details
                        </Link>
                    </div>
                ))}
            </div>

            {/* Show All Courses Button */}
            <div className="text-center mt-8">
                <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-7 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:from-indigo-500 hover:to-blue-600"
                >
                    Show All Courses
                    <FaArrowRight className="ml-2" />
                </Link>
            </div>
        </section>
    );
}
