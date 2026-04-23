"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getCompanyByUserId from "@/libs/getCompanyByUserId";
import getInterviews from "@/libs/getInterviews";
import getReviews from "@/libs/getReviews";
import { CompanyItem } from "@/interface";

export default function CompanyDashboard() {
  const { data: session } = useSession();
  
  const [activeTab, setActiveTab] = useState<"interviews" | "reviews">("interviews");
  
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.user?._id || !session?.user?.token) return;

      try {
        setLoading(true);
        const companyRes = await getCompanyByUserId(session.user._id);
        const myCompany = companyRes.data[0] || companyRes.data; 
        setCompany(myCompany);

        const companyId = myCompany?._id || myCompany?.id;

        if (companyId) {
          console.log("✅ Found Company ID:", companyId);
          
          const [interviewsRes, reviewsRes] = await Promise.all([
            getInterviews(session.user.token, companyId),
            getReviews(companyId)
          ]);

          setInterviews(interviewsRes.data || []);
          setReviews(reviewsRes.data || []);

          console.log("Reviews Data from Backend:", reviewsRes.data);
          console.log("Interviews Data from Backend:", interviewsRes);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Profile Not Found</h2>
        <p className="text-gray-500">Please contact the administrator to setup your company profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 h-24"></div>
        <div className="px-8 pb-8 pt-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{company.name}</h2>
              <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                {company.address || "Address not provided"}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Company Details</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {company.description || "No description available."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <span className="text-sm text-gray-500 block mb-1">Website</span>
                <a href={company.website} target="_blank" className="text-cyan-600 font-medium hover:underline break-all">{company.website || "-"}</a>
              </div>
              <div>
                <span className="text-sm text-gray-500 block mb-1">Telephone</span>
                <span className="text-gray-900 font-medium">{company.tel || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("interviews")}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${
              activeTab === "interviews"
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Interviews ({interviews.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${
              activeTab === "reviews"
                ? "bg-amber-50 text-amber-700 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Company Reviews ({reviews.length})
          </button>
        </div>
      </div>

      <div className="min-h-[300px]">
        
        {activeTab === "interviews" && (
          <div className="space-y-4 animate-fade-in">
            {interviews.length > 0 ? (
              interviews.map((interview: any, idx) => (
                <div key={interview._id || idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      👤 {interview.user?.name || "Candidate Name"}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                      📅 Date: <span className="font-semibold text-cyan-700">{new Date(interview.apptDate || interview.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize border ${
                       interview.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                       interview.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                       'bg-blue-50 text-blue-800 border-blue-200'
                     }`}>
                       {interview.status || "Pending"}
                     </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500 flex flex-col items-center justify-center">
                <div className="text-4xl mb-3 opacity-50">📭</div>
                No interviews scheduled yet.
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4 animate-fade-in">
            {reviews.length > 0 ? (
              reviews.map((review: any, idx) => (
                <div key={review._id || idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-amber-100 text-amber-700 font-bold px-2.5 py-1 rounded-md text-sm flex items-center gap-1 shadow-sm">
                      ★ {review.rating || 5}
                    </span>
                    <span className="text-gray-400 text-xs font-medium">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    "{review.reviewText || "No comment."}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500 flex flex-col items-center justify-center">
                <div className="text-4xl mb-3 opacity-50">⭐</div>
                No reviews available for your company.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}