import getBackendApi from "./getBackendApi";

export default async function handleAttendance(token: string, id: string, status: 'attended' | 'absent'){
    if (!token) return;
    try {
      const backendUrl = getBackendApi();
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