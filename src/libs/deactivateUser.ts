export default async function deactivateUser(token: string) {
	const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;

	const res = await fetch(`${backendUrl}/api/v1/auth/me`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if(!res.ok) {
		throw new Error("Failed to deactivate account");
	}

	return await res.json();
}