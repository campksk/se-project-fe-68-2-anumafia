import getBackendApi from "./getBackendApi";

export default async function togglePublic(isPublic: boolean, company_id: string, token: string ) {
    const backendUrl = getBackendApi()
    const response = await fetch(`${backendUrl}/api/v1/companies/${company_id}/public`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        cache: "no-store" ,
        body: JSON.stringify({ public: isPublic }),
    });

    if (!response.ok) {
        throw new Error(`Failed to toggle public status for company ${company_id}: ${response.statusText}`);
    }

    return await response.json();
}