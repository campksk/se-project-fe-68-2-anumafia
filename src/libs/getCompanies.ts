import getBackendApi from "./getBackendApi";

export default async function getCompanies() {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/companies`, {
    next: { tags: ['companies'] }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return await response.json();
}