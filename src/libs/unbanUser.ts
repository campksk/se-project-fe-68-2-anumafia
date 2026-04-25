import getBackendApi from "./getBackendApi";

export default async function unbanUser(userId: string, token: string) {
  const backendUrl = getBackendApi();

  const res = await fetch(`${backendUrl}/api/v1/users/unban/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
}