'use client'

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { UserItem } from '@/interface'; 
import getUsers from '@/libs/getUsers'; 
import UserControls from '@/components/UserControls';

export default function ManageUserPage() {
  const { data: session } = useSession();
  
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (!session?.user?.token) return;
    try {
      setIsLoading(true);
      const res = await getUsers(session.user.token);
      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.token]);

  useEffect(() => {
    if (session === null) {
      setIsLoading(false);
      return;
    }
    fetchUsers();
  }, [session, fetchUsers]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">
              User Management
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Total: {filteredUsers.length}
            </span>
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 shadow-sm transition-all" 
              placeholder="Search by User Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading user list...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200">
                  
                  <button 
                    onClick={() => toggleExpand(user._id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 focus:outline-none transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-800">{user.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-200">
                        ID: {user._id}
                      </span>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expandedId === user._id ? 'rotate-180' : ''}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {expandedId === user._id && (
                    <div className="px-4 py-5 border-t border-gray-100 bg-gray-50 animate-fade-in-down">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">User Profile Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Email</p>
                          <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Telephone</p>
                          <p className="font-medium text-gray-900">{user.tel || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Role</p>
                          <p className="font-medium text-gray-900 capitalize">{user.role}</p>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end gap-3">
                        <UserControls user={user} token={session?.user?.token || ''} onRefresh={fetchUsers} />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-500 text-lg">No users found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}