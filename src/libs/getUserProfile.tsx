import getBackendApi from "./getBackendApi";

export default async function getUserProfile(token: string) {
  const backendUrl = getBackendApi();
  const response = await fetch(`${backendUrl}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}