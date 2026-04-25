import Link from 'next/link';
import { CompanyItem } from '@/interface';

export default function CompanyCard({ company, hideBookText, isAdmin }: { company: CompanyItem, hideBookText?: boolean, isAdmin?: boolean }) {
  const isPublic = company.public === true;

  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 border ${isAdmin && !isPublic ? 'border-dashed border-gray-300 opacity-75' : 'border-gray-100'} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden`}>
      
      {isAdmin && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl shadow-sm ${isPublic ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
          {isPublic ? 'Public' : 'Hidden'}
        </div>
      )}

      <h3 className={`text-2xl font-bold text-gray-800 mb-2 ${isAdmin ? 'mt-3' : ''}`}>{company.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-3">
        {company.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-400">📞 {company.tel}</span>
        
        <Link 
          href={`/companies/${company._id || company.id}`} 
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-sm"
        >
          {hideBookText ? "View" : "View & Book"}
        </Link>
      </div>
    </div>
  );
}