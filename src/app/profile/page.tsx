"use client"

import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import DeactivateAccountModal from "@/components/DeactivateAccountModal";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import ProfileCard from "@/components/ProfileCard";

export default function ProfileSettingsPage() {
  const { data: session, status } = useSession();

  const [profileData, setProfileData] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Deactivate states
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const fetchProfile = useCallback(async () => {
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
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, fetchProfile]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-600"></div>
      </div>
    );
  }


  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24">
        <p className="text-xl font-bold text-gray-700 bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-200">
          Please Log In...
        </p>
      </div>
    );
  }

  return (
		<main className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4 md:px-12">
        
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl justify-center items-stretch h-auto">

				<ProfileCard
					profileData={profileData}
					isLoading={isLoadingProfile}
					fallbackEmail={session.user?.email}
					onProfileUpdate={fetchProfile}
				/>

        <ChangePasswordForm />

      </div>
    </main>
  );
}