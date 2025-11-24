import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
      <p className="mb-6">Join thousands of students and start learning today!</p>
      <Link
        href="/courses"
        className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
      >
        Browse Courses
      </Link>
    </section>
  );
}
