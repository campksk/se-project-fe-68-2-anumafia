export default async function createReview(companyId: string, rating: number, reviewText: string, token: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const response = await fetch(`${backendUrl}/api/v1/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            company: companyId,
            rating: rating,
            reviewText: reviewText
        }),
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Failed to post review");
    }

    return resData;
}