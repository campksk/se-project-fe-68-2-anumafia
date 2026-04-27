import getBackendApi from "./getBackendApi";

export default async function deleteCompany(companyId: string, token: string) {
  const backendUrl = getBackendApi();

  const res = await fetch(`${backendUrl}/api/v1/companies/${companyId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete company");
  return await res.json();
}