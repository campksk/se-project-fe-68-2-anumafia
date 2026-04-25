export default async function handleAttendance(token: string, id: string, status: 'attended' | 'absent'){
    if (!token) return;
    try {
      const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
      await fetch(`${backendUrl}/api/v1/interviews/${id}/attendance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ attendanceStatus: status })
      });
    } catch (err: any) {
      alert(err.message);
    }
  };