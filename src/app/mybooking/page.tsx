import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getInterviews from "@/libs/getInterviews";
import BookingList from "@/components/BookingList";

export default async function MyBookingPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border-t-4 border-cyan-600">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 text-lg">Please Sign-In to view your interview bookings.</p>
        </div>
      </main>
    );
  }

  const interviewsData = await getInterviews(session.user.token);
  const isAdmin = session.user.role === "admin";

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {isAdmin ? (
              <>Admin <span className="text-red-600">Manages Interviews</span></>
            ) : (
              <>My <span className="text-cyan-600">Bookings</span></>
            )}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {isAdmin 
              ? "Manage all interview sessions across the system. You have full control." 
              : "Manage your upcoming interview sessions and track your career journey."}
          </p>
        </div>
        
        {}
        <BookingList 
          initialBookings={interviewsData?.data || []} 
          token={session.user.token} 
          role={session.user.role} 
        />

      </div>
    </main>
  );
}