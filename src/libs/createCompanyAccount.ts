import getBackendApi from "./getBackendApi";

export default async function createCompanyAccount(token: string, data: any) {
  const response = await fetch(`${getBackendApi()}/api/v1/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, role: "company" }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create company account");
  }

  return await response.json();
}