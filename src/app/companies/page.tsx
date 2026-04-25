import CompanyCatalog from '@/components/CompanyCatalog';
import getCompanies from '@/libs/getCompanies';
import { Suspense } from 'react';

export default async function CompaniesPage() {
  
  const companiesPromise = getCompanies();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Explore <span className="text-cyan-600">Companies</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your dream company and book an interview session today.
          </p>
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