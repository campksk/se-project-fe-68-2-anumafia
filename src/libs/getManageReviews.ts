export default async function getReviews(token: string) {
  const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const response = await fetch(`${backendUrl}/api/v1/reviews`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store" 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Reviews");
  }

  return await response.json();
}