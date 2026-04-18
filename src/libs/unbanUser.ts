export default async function unbanUser(userId: string, token: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/api/v1/users/unban/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
}