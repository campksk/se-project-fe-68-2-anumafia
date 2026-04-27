"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompanyItem } from "@/interface";
import getBackendApi from "@/libs/getBackendApi";

export default function CompanyForm({ company }: { company?: CompanyItem }) {
  const { data: session } = useSession();
  const router = useRouter();
  const isEdit = !!company; 
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: company?.name || "",
    email: "",
    password: "",
    address: company?.address || "",
    website: company?.website || "",
    description: company?.description || "",
    tel: company?.tel || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    const backendUrl = getBackendApi();
    const url = isEdit ? `${backendUrl}/api/v1/companies/${company?._id || company?.id}` : `${backendUrl}/api/v1/companies`;
    const method = isEdit ? "PUT" : "POST";

    try {
      setLoading(true);
      
      const dataToSend = { ...formData };
      if (isEdit) {
        delete (dataToSend as any).email;
        delete (dataToSend as any).password;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.user.token}` },
        body: JSON.stringify(dataToSend)
      });
      
      if (!res.ok) throw new Error("Action failed. Please try again.");
      
      alert(`✅ Company ${isEdit ? 'Updated' : 'Created'} Successfully!`);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && !((session?.user?.role === 'company' && session?.user?._id === company?.user) || session?.user?.role === "admin")) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-lg mx-auto mt-10">
        <div className="text-5xl mb-4 opacity-80">🚫</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized Access</h2>
        <p className="text-gray-500">You do not have permission to edit this company.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-t-4 border-cyan-600 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all" />
        </div>

        {!isEdit && (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Login Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all" />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Website URL</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Telephone</label>
          <input type="tel" name="tel" required value={formData.tel} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
          <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-2.5 outline-none transition-all"></textarea>
        </div>
        
      </div>

      <div className="flex justify-center mt-6">
        <button type="submit" disabled={loading} className="w-full sm:w-auto min-w-[240px] bg-cyan-600 text-white font-bold text-base py-3 px-8 rounded-xl hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            isEdit ? "Save Changes" : "Create New Company"
          )}
        </button>
      </div>
    </form>
  );
}