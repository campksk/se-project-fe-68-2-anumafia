"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import updatePassword from "@/libs/updatePassword";

export default function ChangePasswordForm() {
  const { data: session } = useSession();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    try {
      await updatePassword(session.user.token, currentPassword, newPassword);

      setIsError(false);
      setMessage("Password Updated Successfully! 🎉");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col border-t-4 border-gray-800 h-full">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Change Password</h2>

      {message && (
        <div className={`p-3 rounded text-sm mb-4 shrink-0 ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleUpdatePassword} className="space-y-5 flex flex-col flex-grow">
        <div>
          <input
            type="password"
            placeholder="Current Password"
            required
            value={currentPassword}
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-gray-800 bg-transparent transition-colors"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="New Password (min 6 chars)"
            required
            minLength={6}
            value={newPassword}
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-gray-800 bg-transparent transition-colors"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mt-auto pt-4">
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-all shadow-md active:scale-[0.98]"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}