import CompanyCatalog from '@/components/CompanyCatalog';
import getCompanies from '@/libs/getCompanies';
import { Suspense } from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function CompaniesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token || session.user.role !== "admin") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border-t-4 border-cyan-600">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 text-lg">Please Sign-In as admin to access this page.</p>
        </div>
      </main>
    );
  }
  
  const companiesPromise = getCompanies(session?.user?.token as string);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Manage <span className="text-cyan-600">Companies</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Register new company accounts, oversee the directory, and manage company statuses.
          </p>
        </div>

        
        <div className="flex justify-center mb-10">
          <Link 
            href="/companies/create" 
            className="bg-red-600 text-white font-extrabold py-3 px-8 rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <span className="text-lg">Create Company Account</span>
          </Link>
        </div>


        <Suspense fallback={
          <div className="flex flex-col items-center justify-center mt-20 space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
            <div className="text-xl font-bold text-gray-400 animate-pulse">Loading Companies...</div>
          </div>
        }>
          <CompanyCatalog companiesPromise={companiesPromise} />
        </Suspense>
        
      </div>
    </main>
  );
}