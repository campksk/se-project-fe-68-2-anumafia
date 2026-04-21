import CompanyForm from "@/components/CompanyForm";

export default function CreateCompanyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Create New Company Account</h1>
        <CompanyForm />
      </div>
    </main>
  );
}