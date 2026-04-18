export default async function banUser(
  userId: string,
  token: string,
  reason: string
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/api/v1/auth/ban/${userId}`, {
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

  return await res.json();
}