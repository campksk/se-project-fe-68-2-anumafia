import getBackendApi from "./getBackendApi";

export default async function getCompanyByUserId(userId: string,token:string) {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/companies?user=${userId}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch company details by User ID");
  }

  return await response.json();
}