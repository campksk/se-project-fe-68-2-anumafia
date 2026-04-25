export default async function deleteReview(id: string, token: string) {
	const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;

	const res = await fetch(`${backendUrl}/api/v1/reviews/${id}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!res.ok) {
		throw new Error("Failed to delete review");
	}

	return await res.json();
}