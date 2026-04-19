export default async function getUsers(token: string) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
	const res = await fetch(`${backendUrl}/api/v1/users`, {
		method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
	});

	if(!res.ok) {
		throw new Error(`Failed to fetch users: ${res.statusText}`);
	}

	return await res.json();
}