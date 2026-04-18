"use client"

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import DeactivateAccountModal from "@/components/DeactivateAccountModal";
import deactivateUser from "@/libs/deactivateUser";
import SvgIcon from '@mui/material/SvgIcon';

export default function ProfileSettingsPage() {
  const { data: session } = useSession();

  const [profileData, setProfileData] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Deactivate states
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.token) {
        try {
          setIsLoadingProfile(true);
          const res = await getUserProfile(session.user.token);
          setProfileData(res.success && res.data ? res.data : res);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setIsLoadingProfile(false);
        }
      }
    };
    fetchProfile();
  }, [session]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://be-ihaveksk.vercel.app";
      const res = await fetch(`${backendUrl}/api/v1/auth/updatepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");
      setIsError(false);
      setMessage("Password Updated Successfully! 🎉");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  const handleDeactivate = async () => {
    if (!session?.user?.token) return;
    setIsDeactivating(true);
    try {
      await deactivateUser(session.user.token);
      await signOut({ callbackUrl: "/" });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDeactivating(false);
      setShowDeactivateModal(false);
    }
  };

  if (!session) return <div className="text-center mt-20 font-bold text-gray-700">Please Log In...</div>;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-12">

      <DeactivateAccountModal
        isOpen={showDeactivateModal}
        onConfirm={handleDeactivate}
        onCancel={() => setShowDeactivateModal(false)}
        isLoading={isDeactivating}
      />

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl justify-center items-stretch">

        {/* Profile Info Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Profile Information</h1>

          {isLoadingProfile ? (
            <div className="flex justify-center items-center flex-grow">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : profileData ? (
            <div className="space-y-4 text-gray-700 mt-2 flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                <span className="font-semibold text-gray-500">Name</span>
                <span className="mt-1 sm:mt-0">{profileData.name || "N/A"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                <span className="font-semibold text-gray-500">Email</span>
                <span className="mt-1 sm:mt-0">{profileData.email || session.user?.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                <span className="font-semibold text-gray-500">Role</span>
                <span className="capitalize mt-1 sm:mt-0">{profileData.role || "N/A"}</span>
              </div>
              {profileData.tel && (
                <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                  <span className="font-semibold text-gray-500">Phone</span>
                  <span className="mt-1 sm:mt-0">{profileData.tel}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-500 text-center flex-grow flex items-center justify-center">
              Failed to load profile data.
            </p>
          )}

          {/* Deactivate Button */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setShowDeactivateModal(true)}
              className="w-full py-3 flex justify-center items-center rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md active:scale-[0.98]"
            >
							<SvgIcon viewBox="0 0 24 24" className="!mr-2" fontSize="medium">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
							</SvgIcon>
              Deactivate Account
            </button>
          </div>
        </div>

        {/* Change Password Card — เหมือนเดิมทุกอย่าง */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col border-t-4 border-gray-800">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Change Password</h2>

          {message && (
            <div className={`p-3 rounded text-sm mb-4 ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-5 flex flex-col flex-grow">
            <input
              type="password" placeholder="Current Password" required value={currentPassword}
              className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-gray-800 bg-transparent transition-colors"
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <input
              type="password" placeholder="New Password (min 6 chars)" required minLength={6} value={newPassword}
              className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-gray-800 bg-transparent transition-colors"
              onChange={e => setNewPassword(e.target.value)}
            />
            <div className="mt-auto pt-4">
              <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-all shadow-md active:scale-[0.98]">
                Update Password
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}