type UpdateProfile = {
	name?: string;
	email?: string;
	tel?: string;
};

export default async function updateUserProfile(updateProfile : UpdateProfile, token: string) {
    const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
    
	if(!updateProfile.name && !updateProfile.email && !updateProfile.tel) {
		throw new Error("At least one field must be provided to update the profile");
	}

    const response = await fetch(`${backendUrl}/api/v1/auth/me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateProfile),
    });

    if (!response.ok) {
        throw new Error("Failed to update review");
    }

    return await response.json();
}