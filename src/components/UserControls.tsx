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

  return (
    <div className="flex gap-2">
      {/* 🟡 Yellow */}
      <button
        onClick={() => setOpen("yellow")}
        disabled={user.ban?.isBanned || user.yellowCards?.count >= 3}
        className="bg-yellow-400 px-3 py-1 rounded disabled:opacity-50"
      >
        Yellow
      </button>

      {/* 🔴 Ban */}
      <button
        onClick={() => setOpen("ban")}
        disabled={user.ban?.isBanned}
        className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Ban
      </button>

      {/* 🟢 Unban */}
      <button
        onClick={handleUnban}
        disabled={!user.ban?.isBanned}
        className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Unban
      </button>

      <ActionModal
        isOpen={open === "yellow"}
        title="Give Yellow Card"
        onCancel={() => setOpen(null)}
        onConfirm={handleYellow}
      />

      <ActionModal
        isOpen={open === "ban"}
        title="Ban User"
        onCancel={() => setOpen(null)}
        onConfirm={handleBan}
      />
    </div>
  );
}