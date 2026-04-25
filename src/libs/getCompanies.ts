export default async function getCompanies() {
  const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const response = await fetch(`${backendUrl}/api/v1/companies`, {
    next: { tags: ['companies'] }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return await response.json();
}