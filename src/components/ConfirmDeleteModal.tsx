"use client"

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Do you want to Delete This Review
        </h2>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors text-lg"
          >
            yes
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-300 font-bold py-3 rounded-xl transition-colors text-lg"
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
}