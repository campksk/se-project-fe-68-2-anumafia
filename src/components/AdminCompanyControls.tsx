"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminCompanyControls({ companyId }: { companyId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== "admin") return null;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to DELETE this company?")) return;
    const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
    await fetch(`${backendUrl}/api/v1/companies/${companyId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.user.token}` }
    });
    alert("Company Deleted!");
    router.push("/companies");
    router.refresh();
  };

  return (
    <div className="mt-8 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center justify-between">
      <span className="font-bold text-red-800">🛡️ Admin Controls:</span>
      <div className="flex gap-4">
        <Link href={`/companies/${companyId}/edit`} className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-600">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}