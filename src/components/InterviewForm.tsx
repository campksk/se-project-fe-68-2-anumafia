"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function InterviewForm({ companyId, companyName }: { companyId: string, companyName: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [bookDate, setBookDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const makeBooking = async () => {
    if (!session || !session.user.token) {
      alert("Please Log-in before booking an interview.");
      return;
    }

    if (!bookDate) {
      setMessage("Please select an interview date!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const sessionDate = `${bookDate}T11:00:00Z`;

      const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/v1/companies/${companyId}/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({
          sessionDate: sessionDate,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to book interview. You might have exceeded the 3 bookings limit.");
      }

      alert(`Successfully booked an interview with ${companyName}!`);
      router.push("/mybooking");
      router.refresh();

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-cyan-600 mt-8 md:mt-0">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Book Interview</h3>

      {message && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      <form className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-2">Select Date</label>
          <input
            type="date"
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
            className="border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600 transition-colors text-gray-700 w-full"
          />
        </div>

        <button
          type="button"
          onClick={makeBooking}
          disabled={loading}
          className={`font-bold py-3 rounded-md transition shadow-md mt-4 text-white
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}
          `}
        >
          {loading ? 'Booking in progress...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}