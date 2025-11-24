"use client";

import './globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import TopCourses from '@/components/TopCourses';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Features></Features>
        <TopCourses></TopCourses>
        <Testimonials></Testimonials>
        <CallToAction></CallToAction>
        <Footer />
      </body>
    </html>
  );
}
