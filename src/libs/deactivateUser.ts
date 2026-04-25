import getBackendApi from "./getBackendApi";

export default async function deactivateUser(token: string) {
	const backendUrl = getBackendApi();

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