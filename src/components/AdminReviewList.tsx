"use client"

import { ReviewItem } from "@/interface";
import { useRouter } from "next/navigation";
import deleteReview from "@/libs/deleteReview";
import ReviewCard from "./ReviewCard";

export default function AdminReviewList({ reviews, token }: { reviews: ReviewItem[], token: string }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Review?")) return;
    try {
      await deleteReview(id, token);
      
      alert("Review deleted successfully.");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!reviews || reviews.length === 0) {
    return <div className="text-center text-2xl text-gray-500 mt-16 font-semibold">No review found.</div>;
  }

  return (
    <div className="space-y-6">
      {reviews.map(review => 
		<ReviewCard key={review._id} review={review} handleDelete={handleDelete}/>
      )}
    </div>
  );
}