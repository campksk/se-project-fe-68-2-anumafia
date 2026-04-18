"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserControls from "@/components/UserControls";

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`
        }
      });

      const data = await res.json();
      setUsers(data.data);
    };

    if (session) fetchUsers();
  }, [session]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User List</h1>

      {users.map((user: any) => (
  <div key={user._id} className="border p-4 flex justify-between mb-3 rounded-lg">
    
    <div>
      <p className="font-semibold">{user.name}</p>
      <p className="text-gray-500 text-sm">{user.email}</p>

      {/* 🚫 BAN FIRST (priority สูงสุด) */}
      {user.ban?.isBanned ? (
        <div className="text-red-500 font-bold">
          🚫 BANNED
          {user.ban?.reason && (
            <p className="text-sm font-normal">
              Reason: {user.ban.reason}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* 🟡 Yellow (แสดงเฉพาะ 1–2 เท่านั้น) */}
          {user.yellowCards?.count > 0 && user.yellowCards?.count < 3 && (
            <p className="text-yellow-600 font-medium">
              🟡 Yellow: {user.yellowCards.count}/3
            </p>
          )}
        </>
      )}
    </div>

    <UserControls user={user} />
  </div>
))}
    </div>
  );
}