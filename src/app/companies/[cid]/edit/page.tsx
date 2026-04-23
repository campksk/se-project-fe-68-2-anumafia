import CompanyForm from "@/components/CompanyForm";
import getCompany from "@/libs/getCompany";
import Link from "next/link";

export default async function EditCompanyPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  const companyDetail = await getCompany(cid);

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-6 px-4 md:px-12 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-4">
          <Link href="/" className="text-cyan-600 hover:text-cyan-800 font-semibold inline-flex items-center gap-2 transition-colors">
            <span>←</span> Back to Dashboard
          </Link>
        </div>
        
        <div className="text-center mb-6 animate-fade-in-down">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Edit Profile</h1>
        </div>

        <CompanyForm company={companyDetail.data} />
      </div>
    </main>
  );
}