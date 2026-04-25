import getBackendApi from "./getBackendApi";

export default async function updatePassword(token: string, currentPassword: string, newPassword: string) {
	const backendUrl = getBackendApi();

	const res = await fetch(`${backendUrl}/api/v1/auth/updatepassword`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ currentPassword, newPassword }),
	});

	if (!res.ok) {
		throw new Error(`Failed to update password: ${res.statusText}`);
	}

	return await res.json();
}