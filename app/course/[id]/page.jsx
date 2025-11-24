"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "../../../firebase";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id;
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

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

  // Fetch course details after auth check
  useEffect(() => {
    if (!authChecked) return;

    // fetch(`https://mentora-academy-server.vercel.app/courses/${courseId}`)
    // fetch(`http://localhost:3000/courses/${courseId}`)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [authChecked, courseId]);

  if (!authChecked || loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {course.category}</p>
      <p className="text-gray-800 font-medium mb-2"><strong>Price:</strong> ${course.price}</p>
      <p className="text-gray-500 mb-2"><strong>Duration:</strong> {course.duration}</p>
      <p className="text-gray-600 mb-2"><strong>Instructor:</strong> {course.instructor}</p>
      <p className="text-gray-600 mb-2"><strong>Email:</strong> {course.email}</p>
      <p className="text-gray-600 mb-2"><strong>Rating:</strong> {course.ratingAvg}</p>
      <p className="text-gray-600 mb-2"><strong>Reviews:</strong> {course.reviews}</p>
      <p className="text-gray-600 mb-4">{course.courseDetails}</p>
    </div>
  );
}
