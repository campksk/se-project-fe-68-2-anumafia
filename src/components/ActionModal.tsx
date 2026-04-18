"use client";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  title: string;
}

export default function ActionModal({ isOpen, onConfirm, onCancel, title }: Props) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="bg-white p-6 rounded-xl z-10 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <textarea
          placeholder="Enter reason..."
          className="w-full border p-2 mb-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={() => onConfirm(reason)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}