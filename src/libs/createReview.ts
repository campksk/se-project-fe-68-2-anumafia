import getBackendApi from "./getBackendApi";

export default async function createReview(companyId: string, rating: number, reviewText: string, token: string) {
    const backendUrl = getBackendApi();

    console.log("Debug - Backend URL:", backendUrl);

    const payload = {
        company: companyId,
        rating: rating,
        reviewText: reviewText
    };

    console.log("Debug - Sending Data (Payload):", JSON.stringify(payload));
    
    const response = await fetch(`${backendUrl}/api/v1/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    console.log("Debug - Response Status:", response.status);
    const contentType = response.headers.get("content-type");
    console.log("Debug - Response Content-Type:", contentType);

    if (contentType && contentType.includes("text/html")) {
        const errorHtml = await response.text();
        console.error("Fatal Error: Server returned HTML instead of JSON. See Preview below:");
        console.log(errorHtml.substring(0, 500));
        throw new Error(`Server Error (${response.status}): Expected JSON but got HTML. Check API endpoint.`);
    }

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Failed to post review");
    }

    return resData;
}