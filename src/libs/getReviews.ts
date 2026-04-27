import getBackendApi from "./getBackendApi";

export default async function getReviews(companyId: string) {
  const backendUrl = getBackendApi();
  
  const response = await fetch(`${backendUrl}/api/v1/reviews/${companyId}`, {
    method: "GET",
    cache: "no-store" 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Reviews");
  }

  return await response.json();
}