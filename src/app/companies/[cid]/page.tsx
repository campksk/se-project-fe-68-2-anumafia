import getCompany from "@/libs/getCompany";
import InterviewForm from "@/components/InterviewForm";
import AdminCompanyControls from "@/components/AdminCompanyControls";
import ReviewForm from "@/components/ReviewForm";
import Link from "next/link";
import getReviews from "@/libs/getReviews";
import ReviewList from "@/components/ReviewList";
import { ReviewJson } from "@/interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getInterviews from "@/libs/getInterviews";
export default async function CompanyDetailPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  
  const interviews = role === "user" && session?.user?.token ? (await getInterviews(session.user.token, cid) as any)?.data || [] : [];
  const hasAttended = interviews.some(
    (interview: any) => interview.attendanceStatus === "attended" && (interview.company?._id === cid || interview.company?.id === cid)
  );

  const hideInterviewForm = role === "admin" || role === "company";
  const hideReviewForm = role === "admin" || role === "company" || !hasAttended;
  
  const companyDetail = await getCompany(cid,session?.user?.token as string);
  const company = companyDetail.data;

  const reviewsData = await getReviews(cid) as ReviewJson;
  const reviews = reviewsData.data || [];

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center mt-20 text-3xl font-bold text-gray-400 mb-4">Company not found.</div>
        <Link href="/companies" className="text-cyan-600 hover:underline font-semibold">← Return to Catalog</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
       
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-2xl shadow-md p-8 border border-gray-100 flex flex-col">
            <div>
              <Link href="/companies" className="text-cyan-600 hover:text-cyan-800 font-semibold mb-6 inline-flex items-center gap-2 transition-colors">
                <span>←</span> Back to Catalog
              </Link>
              
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{company.name}</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {company.description}
              </p>
              
              <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Contact Information</h3>
                <p className="text-gray-700 flex items-start gap-2">
                  <span className="font-semibold text-gray-900 min-w-[80px]">📍 Address:</span>
                  <span>{company.address}</span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <span className="font-semibold text-gray-900 min-w-[80px]">📞 Tel:</span>
                  <span>{company.tel}</span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <span className="font-semibold text-gray-900 min-w-[80px]">🌐 Website:</span>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-800 hover:underline truncate">
                    {company.website}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <AdminCompanyControls companyId={company._id || company.id} />
            </div>
          </div>

          {!hideInterviewForm && (
            <div className="w-full md:w-[400px] flex justify-center md:justify-end shrink-0">
              <InterviewForm companyId={company._id || company.id} companyName={company.name} />
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
           {!hideReviewForm && (
             <>
               <ReviewForm companyId={company._id || company.id} />
               <div className="mt-8 pt-8 border-t border-gray-100"></div>
             </>
           )}
           
           <ReviewList reviews={reviews} companyId={cid || company.id} />
        </div>
       
      </div>
    </main>
  );
}