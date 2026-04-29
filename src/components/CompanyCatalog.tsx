import CompanyCard from './CompanyCard';
import { CompanyJson } from '@/interface';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UnauthorizedPage from '@/app/(Authen)/unauthorized/page';

export default async function CompanyCatalog({ companiesPromise }: { companiesPromise: Promise<CompanyJson> }) {
  let companiesJson;
  try {
    companiesJson = await companiesPromise;
  }catch (error) {
    console.error("Error fetching companies:", error);
    return <UnauthorizedPage />;
  }
  
  const session = await getServerSession(authOptions);
  
  const role = (session?.user as any)?.role;
  const isAdmin = role === "admin";
  const isCompany = role === "company";
  const hideBookText = isAdmin || isCompany;
  
  const myUserId = (session?.user as any)?._id || (session?.user as any)?.id;
  
  if (!companiesJson || !companiesJson.data || companiesJson.data.length === 0) {
    return <div className="text-center text-gray-500 text-xl mt-10">No companies available at the moment.</div>;
  }

  let visibleCompanies = [...companiesJson.data];

  if (isAdmin) {
    visibleCompanies.sort((a: any, b: any) => {
      if (a.public && !b.public) return -1;
      if (!a.public && b.public) return 1;
      return 0;
    });
  } else if (isCompany && myUserId) {
    visibleCompanies.sort((a: any, b: any) => {
      if (a.user === myUserId) return -1; 
      if (b.user === myUserId) return 1;  
      return 0; 
    });
  }

  if (visibleCompanies.length === 0) {
    return <div className="text-center text-gray-500 text-xl mt-10">No public companies available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {visibleCompanies.map((company: any) => (
        <CompanyCard 
          key={company._id || company.id} 
          company={company} 
          hideBookText={hideBookText} 
          isAdmin={isAdmin} 
          isOwned={isCompany && company.user === myUserId}
        />
      ))}
    </div>
  );
}