import getBackendApi from "./getBackendApi";

export default async function getCompanies(token: string) {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/companies`, {
    next: { tags: ['companies'] },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return await response.json();
}