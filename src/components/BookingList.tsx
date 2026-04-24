"use client"

import { useState } from "react";
import { InterviewItem, CompanyItem } from "@/interface";
import { useRouter } from "next/navigation";

export default function BookingList({ initialBookings, token, role }: { initialBookings: InterviewItem[], token: string, role?: string }) {
  const [bookings, setBookings] = useState<InterviewItem[]>(initialBookings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<string>("");
  const router = useRouter();

  const isAdmin = role === "admin";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this interview?")) return;
    try {
      const res = await fetch(`${backendUrl}/api/v1/interviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      
      setBookings(bookings.filter(b => b._id !== id));
      alert("Interview cancelled successfully.");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEditSubmit = async (id: string) => {
    if (!editDate) return;
    try {
      const sessionDate = `${editDate}T11:00:00Z`;
      const res = await fetch(`${backendUrl}/api/v1/interviews/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ sessionDate })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update booking");
      }
      
      setBookings(bookings.map(b => b._id === id ? { ...b, sessionDate } : b));
      setEditingId(null);
      setEditDate("");
      alert("Interview date updated!");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!bookings || bookings.length === 0) {
    return <div className="text-center text-2xl text-gray-500 mt-16 font-semibold">No interview bookings found.</div>;
  }

  return (
    <div className="space-y-6">
      {bookings.map(booking => {
        const company = booking.company as CompanyItem;
        const isEditing = editingId === booking._id;
        const displayDate = new Date(booking.sessionDate).toLocaleDateString('en-GB');
        const statusColor = booking?.attendanceStatus === "pending" ? "text-gray-500" : booking?.attendanceStatus === "attended" ? "text-green-500" : booking?.attendanceStatus === "absent" ? "text-red-500" : "";

        return (
          <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-cyan-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:shadow-lg">
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{company?.name || "Unknown Company"}</h3>
              
              {}
              {isAdmin && booking.user && (
                <div className="mt-3 mb-4 bg-red-50 text-red-800 px-5 pt-0 py-2 rounded-lg border border-red-200 shadow-sm">
                  {typeof booking.user === 'string' ? (
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border border-red-100 mt-2">
                      <span className="font-bold text-red-700">👤 User ID:</span> {booking.user}
                    </p>
                  ) : (
                    <div className="space-y-1.5 text-sm mt-2">
                      <p className="flex items-center gap-2"><span className="font-semibold w-20">👤 Name:</span> {(booking.user as any).name || "N/A"}</p>
                      <p className="flex items-center gap-2"><span className="font-semibold w-20">📧 Email:</span> {(booking.user as any).email || "N/A"}</p>
                      {/* <p className="flex items-center gap-2"><span className="font-semibold w-20">📞 Tel:</span> {(booking.user as any).tel || "N/A"}</p> */}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1.5 mt-2">
                <p className="text-gray-600 flex items-start gap-2"><span className="font-semibold min-w-[80px]">📍 Location:</span> <span>{company?.address || "N/A"}</span></p>
                <p className="text-gray-600 flex items-center gap-2"><span className="font-semibold min-w-[80px]">📞 Tel:</span> <span>{company?.tel || "N/A"}</span></p>
                <p className="text-gray-600 flex items-center gap-2"><span className="font-semibold min-w-[80px]">Attendance Status:</span> <span className={statusColor} >{booking?.attendanceStatus || "N/A"}</span></p>
              </div>
              
              {isEditing ? (
                <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <input 
                    type="date" 
                    min="2022-05-10" max="2022-05-13" 
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="border-gray-300 rounded-lg p-2.5 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm w-full sm:w-auto text-gray-700"
                  />
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button onClick={() => handleEditSubmit(booking._id)} className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm">Save</button>
                    <button onClick={() => setEditingId(null)} className="flex-1 sm:flex-none bg-gray-400 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-500 transition-colors shadow-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 inline-block bg-cyan-50 border border-cyan-100 px-4 py-2.5 rounded-lg">
                  <p className="text-lg font-bold text-cyan-800 flex items-center gap-2">
                    <span>🗓️</span> Interview Date: {displayDate}
                  </p>
                </div>
              )}
            </div>

            {!isEditing && (
              <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-6 md:mt-0">
                <button 
                  onClick={() => { setEditingId(booking._id); setEditDate(booking.sessionDate.split('T')[0]); }} 
                  className="flex-1 md:flex-none bg-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition shadow-sm"
                >
                  Edit Date
                </button>
                <button 
                  onClick={() => handleDelete(booking._id)} 
                  className="flex-1 md:flex-none bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition shadow-sm"
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}