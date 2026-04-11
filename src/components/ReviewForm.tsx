"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import createReview from "@/libs/createReview";

export default function ReviewForm({ companyId }: { companyId: string }) {
    const { data: session } = useSession();
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePostReview = async () => {
        if (!session || !session.user.token) {
            alert("Please log in to post a review.");
            return;
        }
        if (rating === 0 || !reviewText.trim()) {
            alert("Please provide both rating and review text.");
            return;
        }

        setLoading(true);
        try {
            await createReview(companyId, rating, reviewText, session.user.token);
            alert("Review posted successfully!");
            setReviewText("");
            setRating(0);
            window.location.reload();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="text-xl font-bold mb-4">Interview Review</h3>
            
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Your rating:</span>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <textarea
                    placeholder="How is your review?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 h-24"
                />

                <div className="flex justify-end">
                    <button
                        onClick={handlePostReview}
                        disabled={loading}
                        className={`px-8 py-2 rounded-lg text-white font-semibold transition
                            ${loading ? 'bg-gray-400' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
}