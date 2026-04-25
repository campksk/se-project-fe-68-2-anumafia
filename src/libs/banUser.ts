export default async function banUser(
  userId: string,
  token: string,
  reason: string
) {
  const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/api/v1/users/ban/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      unit: "permanent",
      reason
    })
  });

  if (!res.ok) {
	throw new Error(`Failed to ban user: ${res.statusText}`);
  }

  return await res.json();
}