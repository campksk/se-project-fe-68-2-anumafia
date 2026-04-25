"use client"

import { useSession } from "next-auth/react";
import Link from 'next/link';
import CompanyDashboard from "@/components/CompanyDashboard";

export default function Home() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const isCompany = session?.user?.role === "company";

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </main>
    );
  }

  if (isAdmin) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pt-16 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-cyan-200/40 blur-3xl"></div>
           <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-3xl"></div>
        </div>

        <section className="relative flex-grow flex flex-col items-center justify-center pt-24 pb-32 px-4 z-10">
          <div className="max-w-6xl w-full">
            
            <div className="text-center mb-16 animate-fade-in-down">
              <span className="inline-block py-1.5 px-4 rounded-full bg-slate-800 text-white text-xs font-bold mb-6 tracking-widest shadow-md uppercase hover:bg-slate-700 transition-colors cursor-default">
                Admin Command Center
              </span>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
                System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Overview</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Monitor platform integrity, manage users, and oversee all JobFair 2026 operations from your central dashboard.
              </p>
              
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mt-8 opacity-80"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <Link href="/admin/manage-users" className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group z-10 relative overflow-hidden">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Manage Users</h2>
                <p className="text-gray-600 leading-relaxed">Control user accounts, issue warnings, and ban malicious users from the platform.</p>
              </Link>

              <Link href="/admin/manage-reviews" className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group z-10 relative overflow-hidden">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Manage Reviews</h2>
                <p className="text-gray-600 leading-relaxed">Moderate user feedback. Approve constructive reviews or remove inappropriate content.</p>
              </Link>

              <Link href="/admin/manage-bookings" className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group z-10 relative overflow-hidden">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Manage Bookings</h2>
                <p className="text-gray-600 leading-relaxed">Oversee all interview sessions. Track schedules and ensure a smooth booking process.</p>
              </Link>

              <Link href="/admin/manage-companies" className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group z-10 relative overflow-hidden">
                <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Manage Companies</h2>
                <p className="text-gray-600 leading-relaxed">Register new company accounts, oversee the directory, and manage company statuses.</p>
              </Link>
              
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-8 text-center z-10 mt-auto">
          <p className="font-medium">© 2026 JobFair Registration Platform. Engineered with 💻 and ☕.</p>
        </footer>
      </main>
    );
  }

  if (isCompany) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-200/30 blur-3xl"></div>
           <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-10 animate-fade-in-down">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Workspace</span>
            </h1>
          </div>

          <CompanyDashboard />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-16">
      
      <section className="relative flex-grow flex items-center justify-center py-20 px-4 overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-cyan-200/40 blur-3xl"></div>
           <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold mb-6 tracking-wide shadow-sm">
            🚀 THE ULTIMATE CAREER PLATFORM
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Discover Your Future at <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              JobFair 2026
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with world-class companies, explore endless career opportunities, and secure your exclusive interview sessions in just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/companies" 
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1"
            >
              Explore Companies
            </Link>
            
            {!session && (
              <Link 
                href="/signup" 
                className="w-full sm:w-auto bg-white text-gray-800 border-2 border-gray-200 font-bold py-4 px-10 rounded-full hover:border-cyan-500 hover:text-cyan-700 transition-all shadow-sm transform hover:-translate-y-1"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-4 border-t border-gray-100 z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Join Our Platform?</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
              <div className="w-20 h-20 mx-auto bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Top Companies</h3>
              <p className="text-gray-600 leading-relaxed">Access exclusive profiles of leading tech companies looking for talents just like you.</p>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
              <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🗓️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Direct Booking</h3>
              <p className="text-gray-600 leading-relaxed">Schedule interview sessions instantly with your preferred companies. No middleman.</p>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
              <div className="w-20 h-20 mx-auto bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Track</h3>
              <p className="text-gray-600 leading-relaxed">Skip the long queues and get direct access to HR representatives. Fast and secure.</p>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center z-10 mt-auto">
        <p className="font-medium">© 2026 JobFair Registration Platform. Engineered with 💻 and ☕.</p>
      </footer>

    </main>
  );
}