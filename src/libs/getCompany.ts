import getBackendApi from "./getBackendApi";

export default async function getCompany(id: string, token: string) {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/companies/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch company details");
  }

  return await response.json();
}