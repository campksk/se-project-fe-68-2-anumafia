"use client";

import { useState } from "react";
import yellowCardUser from "@/libs/yellowCardUser";
import banUser from "@/libs/banUser";
import unbanUser from "@/libs/unbanUser";
import ActionModal from "./ActionModal";
import { UserItem } from "@/interface";

export default function UserControls({
  user,
  token,
  onRefresh,
}: {
  user: UserItem;
  token: string;
  onRefresh: () => Promise<void>;
}) {
  const userId = user._id;

  const [open, setOpen] = useState<null | "yellow" | "ban">(null);

  const handleYellow = async (reason: string) => {
    await yellowCardUser(userId, token, reason);
    alert("Yellow card given");
    setOpen(null);
    await onRefresh();
  };

  const handleBan = async (reason: string) => {
    await banUser(userId, token, reason);
    alert("User banned");
    setOpen(null);
    await onRefresh();
  };

  const handleUnban = async () => {
    await unbanUser(userId, token);
    alert("User unbanned");
    await onRefresh();
  };

  const yellowCount = user.yellowCards?.count || 0;
  const isEffectivelyBanned = user.ban?.isBanned || yellowCount >= 3;

  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      
      {isEffectivelyBanned ? (
        
        <button
          onClick={handleUnban}
          className="group relative flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 bg-emerald-500 border-2 border-emerald-500 text-white hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
          </svg>
          <span>Unban</span>
        </button>

      ) : (

        <>
          <button
            onClick={() => setOpen("yellow")}
            className="group relative flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 bg-white border-2 border-amber-400 text-amber-600 hover:bg-amber-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span>Yellow Card</span>
          </button>

          <button
            onClick={() => setOpen("ban")}
            className="group relative flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
            </svg>
            <span>Ban User</span>
          </button>
        </>
      )}

      <ActionModal
        isOpen={open === "yellow"}
        title="Give Yellow Card"
        onCancel={() => setOpen(null)}
        onConfirm={handleYellow}
      />

      <ActionModal
        isOpen={open === "ban"}
        title="Ban User (Direct Red Card)"
        onCancel={() => setOpen(null)}
        onConfirm={handleBan}
      />
    </div>
  );
}