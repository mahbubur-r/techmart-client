"use client";

import { useEffect, useState } from "react";

export default function Profile({ user }) {
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`)
                .then((res) => res.json())
                .then((data) => setDbUser(data))
                .catch((err) => console.error(err));
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                <img
                    src={user.photoURL || dbUser?.image || "https://i.ibb.co/MgsTCcv/avater.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                    {user.displayName || dbUser?.name || "User"}
                </h2>
                <p className="text-gray-500">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {dbUser?.role || "Member"}
                </span>
            </div>
        </div>
    );
}
