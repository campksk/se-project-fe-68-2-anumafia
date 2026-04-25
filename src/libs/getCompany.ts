export default async function getCompany(id: string) {
  const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const response = await fetch(`${backendUrl}/api/v1/companies/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch company details");
  }

  return await response.json();
}