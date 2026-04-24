"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-16">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-cyan-600 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Sign Out</h1>
        <p className="text-gray-600 mb-8">Are you sure you want to sign out?</p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700 transition shadow-md"
          >
            Yes, Sign Out
          </button>
          
          <button 
            onClick={() => router.back()}
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-300 transition shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}