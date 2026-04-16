export default async function getReviews(companyId: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/v1/reviews/${companyId}`, {
    cache: "no-store"
  });
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return await res.json();
}