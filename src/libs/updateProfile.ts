export default async function updateProfile(token: string, newName: string, newTel: string) {
  const response = await fetch(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: Bearer ${token},
    },
    body: JSON.stringify({
      name: newName,
      tel: newTel,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
}