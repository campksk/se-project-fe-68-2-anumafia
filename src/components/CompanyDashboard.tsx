"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getCompanyByUserId from "@/libs/getCompanyByUserId";
import getInterviews from "@/libs/getInterviews";
import getReviews from "@/libs/getReviews";
import { CompanyItem } from "@/interface";
import deleteCompany from "@/libs/deleteCompany";
import { signOut } from "next-auth/react";
import togglePublic from "@/libs/togglePublic";
import { Switch } from "@mui/material";
export default function CompanyDashboard() {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<"interviews" | "reviews">("interviews");

  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
          const [interviewsRes, reviewsRes] = await Promise.all([
            getInterviews(session.user.token, companyId),
            getReviews(companyId)
          ]);

          setInterviews(interviewsRes.data || []);
          setReviews(reviewsRes.data || []);
        }
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session]);

  const [isDisable, setIsDisable] = useState(false);

  const handleSwitch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisable(true);

    setCompany((prev) => {
      if (!prev) return prev;
      const updatedCompany = { ...prev, public: e.target.checked };
      return updatedCompany;
    });

    try {
      await togglePublic(e.target.checked, company?._id || company?.id as string, session?.user.token as string);
    } catch (error) {
      console.error("❌ Error toggling public status:", error);
    } finally {
      setTimeout(() => setIsDisable(false), 3000);
    }
  }

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
  const handleDeleteCompany = async () => {
    if (!session?.user?.token || !company) return;
    try {
      setIsDeleting(true);
      await deleteCompany(company._id || company.id, session.user.token);
      await signOut({ callbackUrl: "/" });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setConfirmed(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 z-10">

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
              Delete Company Profile
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Are you sure you want to delete this company?
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 space-y-2">
              <p className="text-sm font-bold text-red-700 mb-2">What will happen:</p>
              {[
                "Company profile will be permanently deleted",
                "All interview bookings will be cancelled",
                "All company reviews will be removed",
                "Your account will be signed out immediately",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                  <p className="text-sm text-red-700">{item}</p>
                </div>
              ))}
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-red-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700">
                I understand this action is <span className="font-bold text-red-600">irreversible</span> and want to delete this company.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCompany}
                disabled={!confirmed || isDeleting}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all
                  ${confirmed && !isDeleting
                    ? "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
                    : "bg-red-300 cursor-not-allowed"
                  }`}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div className="flex gap-5">
              <div className="flex items-center">
                <Switch
                  checked={company.public}
                  onChange={handleSwitch}
                  disabled={isDisable}
                  color="primary"
                />
                <p>Public</p>
              </div>
              <Link
                href={`/companies/${company._id || company.id}/edit`}
                className="bg-gray-50 hover:bg-cyan-50 text-gray-600 hover:text-cyan-700 border border-gray-200 hover:border-cyan-200 font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                <span className="hidden sm:inline">Edit Info</span>
              </Link>

            </div>
          </div>
          <div className="flex items-center gap-2 pb-5">
            <Link
              href={`/companies/${company._id || company.id}/edit`}
              className="bg-gray-50 hover:bg-cyan-50 text-gray-600 hover:text-cyan-700 border border-gray-200 hover:border-cyan-200 font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              <span className="hidden sm:inline">Edit Info</span>
            </Link>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Company Details</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {company.description || "No description available."}
            </p>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <span className="text-sm text-gray-500 block mb-1">Website</span>
                <a href={company.website} target="_blank" className="text-cyan-600 font-medium hover:underline break-all">{company.website || "-"}</a>
              </div>
              <div>
                <span className="text-sm text-gray-500 block mb-1">Telephone</span>
                <span className="text-gray-900 font-medium">{company.tel || "-"}</span>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("interviews")}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${activeTab === "interviews"
              ? "bg-blue-50 text-blue-700 shadow-sm"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            Interviews ({interviews.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${activeTab === "reviews"
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
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize border ${interview.attendanceStatus === 'attended' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      interview.attendanceStatus === 'absent' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                      {interview.attendanceStatus || "pending"}
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