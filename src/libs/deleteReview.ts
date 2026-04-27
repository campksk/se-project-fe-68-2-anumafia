import getBackendApi from "./getBackendApi";

export default async function deleteReview(id: string, token: string) {
	const backendUrl = getBackendApi();

	const res = await fetch(`${backendUrl}/api/v1/reviews/${id}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!res.ok) {
		throw new Error("Failed to delete review");
	}

	return await res.json();
}