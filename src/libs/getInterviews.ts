export default async function getInterviews(token: string, companyId?: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const url = companyId ? `${backendUrl}/api/v1/companies/${companyId}/interviews` : `${backendUrl}/api/v1/interviews`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store" 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }

  return await response.json();
}