"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { ReviewItem } from "@/interface";

interface ReviewListProps {
  reviews: ReviewItem[];
  companyId: string;
}

export default function ReviewList({ reviews: initialReviews, companyId }: ReviewListProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId || !session?.user?.token) return;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await fetch(`${backendUrl}/api/v1/reviews/${deleteTargetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.user.token}` }
      });
      if (!res.ok) throw new Error("Failed to delete review");
      setReviews(reviews.filter(r => r._id !== deleteTargetId));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleEditSubmit = async (reviewId: string) => {
    if (!session?.user?.token) return;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await fetch(`${backendUrl}/api/v1/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`
        },
        body: JSON.stringify({ rating: editRating, reviewText: editText })
      });
      if (!res.ok) throw new Error("Failed to update review");
      setReviews(reviews.map(r =>
        r._id === reviewId ? { ...r, rating: editRating, reviewText: editText } : r
      ));
      setEditingId(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const renderStars = (count: number) =>
    [1, 2, 3, 4, 5].map(i => (
      <span key={i} className={`text-lg ${i <= count ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ));

  if (reviews.length === 0) {
    return <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>;
  }

  return (
    <>
      <ConfirmDeleteModal
        isOpen={!!deleteTargetId}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Interview Reviews</h3>
        {avgRating && (
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(Number(avgRating)))}</div>
            <span className="font-bold text-gray-800">{avgRating}</span>
            <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map(review => {
          const isOwner = session?.user?._id === review.user?._id;
          const isEditing = editingId === review._id;
          const date = new Date(review.createdAt).toLocaleDateString("en-GB");

          return (
            <div key={review._id} className="bg-white border border-gray-200 rounded-xl p-5">
              {/* Review Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800">
                    {review.user?.name || "Anonymous"}
                  </span>
                  <span className="text-gray-400 text-sm">{date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {isOwner && <span className="text-xs text-gray-400 mr-1">your rating</span>}
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
              </div>

              {/* Review Body */}
              {isEditing ? (
                <div className="space-y-3 mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <button key={i} onClick={() => setEditRating(i)}
                        className={`text-2xl ${i <= editRating ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingId(null)}
                      className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={() => handleEditSubmit(review._id)}
                      className="px-4 py-2 text-sm rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 font-semibold">
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.reviewText}</p>
                  {isOwner && (
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => { setEditingId(review._id); setEditText(review.reviewText); setEditRating(review.rating); }}
                        className="flex items-center gap-1 px-4 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(review._id)}
                        className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}