import getBackendApi from "./getBackendApi";

export default async function getUsers(token: string, queryString: string = "") {
  const response = await fetch(`${getBackendApi()}/api/v1/users${queryString}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store" 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
}