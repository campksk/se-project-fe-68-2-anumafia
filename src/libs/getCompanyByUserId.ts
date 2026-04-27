import getBackendApi from "./getBackendApi";

export default async function getCompanyByUserId(userId: string) {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/companies?user=${userId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch company details by User ID");
  }

  return await response.json();
}