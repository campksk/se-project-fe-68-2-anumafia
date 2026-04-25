import getBackendApi from "./getBackendApi";

export default async function getCompany(id: string) {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/companies/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch company details");
  }

  return await response.json();
}