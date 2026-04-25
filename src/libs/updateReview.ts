export default async function updateReview(reviewId: string, rating: number, reviewText: string, token: string) {
    const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const response = await fetch(`${backendUrl}/api/v1/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            rating: rating,
            reviewText: reviewText
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to PUT review");
    }

    return await response.json();
}