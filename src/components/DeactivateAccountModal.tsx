"use client"

import { useState } from "react";

interface DeactivateAccountModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeactivateAccountModal({ isOpen, onConfirm, onCancel, isLoading }: DeactivateAccountModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleCancel = () => {
    setConfirmed(false);
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={handleCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 z-10">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
          Deactivate Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          This action is permanent and cannot be undone.
        </p>

        {/* Consequences */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 space-y-2">
          <p className="text-sm font-bold text-red-700 mb-2">What will happen:</p>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✕</span>
            <p className="text-sm text-red-700">Your account will be permanently deactivated</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✕</span>
            <p className="text-sm text-red-700">All your interview bookings will be cancelled</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✕</span>
            <p className="text-sm text-red-700">Your reviews and data will be removed</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✕</span>
            <p className="text-sm text-red-700">You will be signed out immediately</p>
          </div>
        </div>

        {/* Confirm Checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={e => setConfirmed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-red-600 cursor-pointer"
          />
          <span className="text-sm text-gray-700">
            I understand that this action is <span className="font-bold text-red-600">irreversible</span> and I want to deactivate my account.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!confirmed || isLoading}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all
              ${confirmed && !isLoading
                ? "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
                : "bg-red-300 cursor-not-allowed"
              }`}
          >
            {isLoading ? "Deactivating..." : "Deactivate"}
          </button>
        </div>

      </div>
    </div>
  );
}