"use client"

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import updateProfile from "@/libs/updateProfile";
import DeactivateAccountModal from "./DeactivateAccountModal";
import SvgIcon from "@mui/material/SvgIcon";
import deactivateUser from "@/libs/deactivateUser";

type ProfileData = {
  name?: string;
  email?: string;
  role?: string;
  tel?: string;
};

type Props = {
  profileData: ProfileData | null;
  isLoading: boolean;
  fallbackEmail?: string | null;
  onProfileUpdate?: () => void; 
};

export default function ProfileCard({ profileData, isLoading, fallbackEmail, onProfileUpdate }: Props) {
  const { data: session } = useSession();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [editName, setEditName] = useState("");
  const [editTel, setEditTel] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
	const [isDeactivating, setIsDeactivating] = useState(false);


  useEffect(() => {
    if (profileData) {
      setEditName(profileData.name || "");
      setEditTel(profileData.tel || "");
    }
  }, [profileData, isEditing]);

  const handleSave = async () => {
    if (!editName.trim()) {
      setErrorMsg("Display Name cannot be empty.");
      return;
    }

    if (!session?.user?.token) return;

    try {
      setIsSaving(true);
      setErrorMsg("");

      await updateProfile(session.user.token, editName, editTel);

      setIsEditing(false);

      if (onProfileUpdate) {
        onProfileUpdate();
      } else {
        window.location.reload(); 
      }
      
    } catch (error) {
      setErrorMsg("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
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

  const handleCancel = () => {
    setIsEditing(false);
    setErrorMsg(""); 
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col h-full transition-all duration-300">
		<DeactivateAccountModal
			isOpen={showDeactivateModal}
			onConfirm={handleDeactivate}
			onCancel={() => setShowDeactivateModal(false)}
			isLoading={isDeactivating}
		/>
	  <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Profile Information</h1>

      {isLoading ? (
        <div className="flex justify-center items-center flex-grow">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : profileData ? (
        <div className="space-y-4 text-gray-700 mt-2 flex-grow flex flex-col">
          
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-2">
              <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4 flex-grow animate-fade-in">
              <div className="flex flex-col border-b pb-3">
                <label className="font-semibold text-gray-500 mb-1">Display Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col border-b pb-3 opacity-60 bg-gray-50 rounded p-2">
                <span className="font-semibold text-gray-500">Email (Cannot be changed)</span>
                <span className="mt-1">{profileData.email || fallbackEmail}</span>
              </div>

              <div className="flex flex-col border-b pb-3 opacity-60 bg-gray-50 rounded p-2">
                <span className="font-semibold text-gray-500">Role</span>
                <span className="capitalize mt-1">{profileData.role || "N/A"}</span>
              </div>

              <div className="flex flex-col border-b pb-3">
                <label className="font-semibold text-gray-500 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={editTel}
                  onChange={(e) => setEditTel(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex-grow animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                <span className="font-semibold text-gray-500">Name</span>
                <span className="mt-1 sm:mt-0 text-left sm:text-right font-medium text-gray-900">{profileData.name || "N/A"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                <span className="font-semibold text-gray-500">Email</span>
                <span className="mt-1 sm:mt-0 text-left sm:text-right">{profileData.email || fallbackEmail}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                <span className="font-semibold text-gray-500">Role</span>
                <span className="capitalize mt-1 sm:mt-0 text-left sm:text-right bg-gray-100 px-2 py-0.5 rounded text-sm">{profileData.role || "N/A"}</span>
              </div>
              {profileData.tel && (
                <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
                  <span className="font-semibold text-gray-500">Phone</span>
                  <span className="mt-1 sm:mt-0 text-left sm:text-right">{profileData.tel}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3 mt-auto pt-4">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" 
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70" 
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : "Save Changes"}
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 hover:shadow-md transition-all flex items-center gap-2" 
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                Edit Profile
              </button>
            )}
            <button
              onClick={() => setShowDeactivateModal(true)}
              className="w-full py-3 mt-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex justify-center items-center transition-all shadow-md active:scale-[0.98]"
            >
							<SvgIcon viewBox="0 0 24 24" className="!mr-2" fontSize="medium">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
							</SvgIcon>
              Deactivate Account
            </button>
          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <p className="text-red-500 text-center bg-red-50 p-4 rounded-lg border border-red-100">Failed to load profile data.</p>
        </div>
      )}
    </div>
  );
}