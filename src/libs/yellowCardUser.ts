import getBackendApi from "./getBackendApi";

export default async function yellowCardUser(userId: string, token: string, reason: string) {
  const backendUrl = getBackendApi();

  const res = await fetch(`${backendUrl}/api/v1/users/yellowcard/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ reason })
  });

  return await res.json();
}