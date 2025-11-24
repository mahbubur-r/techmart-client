"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import AddCourseForm from "./AddCourseForm";
import MyAddedCourses from "./MyAddedCourses";
import MyEnrolledCourses from "./MyEnrolledCourses";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/login");
      } else {
        setUser(u);
      }
    });
    return () => unsub();
  }, [router]);

  function handleSavedCourse(savedCourse) {
    setRefreshFlag((s) => s + 1);
    setEditingCourse(null);
    setShowForm(false);
  }

  function handleEditRequest(course) {
    setEditingCourse(course);
    setShowForm(true);
  }

  function handleDeleted() {
    setRefreshFlag((s) => s + 1);
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            setShowForm((s) => !s);
            setEditingCourse(null);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:opacity-95 transition"
        >
          {showForm ? "Close Form" : "Add New Course"}
        </button>

        {editingCourse && (
          <div className="text-sm text-gray-600">
            Editing: <span className="font-medium">{editingCourse.title}</span>
          </div>
        )}
      </div>

      {showForm && (
        <AddCourseForm
          user={user}
          editingCourse={editingCourse}
          onCancel={() => {
            setEditingCourse(null);
            setShowForm(false);
          }}
          onSaved={handleSavedCourse}
        />
      )}

      {/* Enrolled Courses */}
      <MyEnrolledCourses user={user} />

      {/* Added Courses */}
      <MyAddedCourses
        user={user}
        onEdit={handleEditRequest}
        onDeleted={handleDeleted}
        refreshFlag={refreshFlag}
      />
    </div>
  );
}
