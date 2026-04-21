"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompanyItem } from "@/interface";

export default function CompanyForm({ company }: { company?: CompanyItem }) {
  const { data: session } = useSession();
  const router = useRouter();
  const isEdit = !!company; 

  const [formData, setFormData] = useState({
    name: company?.name || "",
    email: "",
    password: "",
    address: company?.address || "",
    website: company?.website || "",
    description: company?.description || "",
    tel: company?.tel || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = isEdit ? `${backendUrl}/api/v1/companies/${company._id || company.id}` : `${backendUrl}/api/v1/companies`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.user.token}` },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Action failed");
      
      alert(`Company ${isEdit ? 'Updated' : 'Created'} Successfully!`);
      router.push("/companies");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-4 border-t-4 border-red-600">
      <input type="text" placeholder="Company Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />
      {isEdit || <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />}
      {isEdit || <input type="password" placeholder="Password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />}
      <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />
      <input type="text" placeholder="Website URL" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />
      <input type="tel" placeholder="Telephone" required value={formData.tel} onChange={(e) => setFormData({...formData, tel: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />
      <textarea placeholder="Description" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border-b-2 py-2 focus:border-red-600 outline-none" />
      
      <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700 transition shadow">
        {isEdit ? "Update Company" : "Create New Company"}
      </button>
    </form>
  );
}