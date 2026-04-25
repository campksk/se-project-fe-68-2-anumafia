import getBackendApi from "./getBackendApi";

export default async function updateReview(reviewId: string, rating: number, reviewText: string, token: string) {
    const backendUrl = getBackendApi();
    
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