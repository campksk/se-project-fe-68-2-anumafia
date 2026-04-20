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
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
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
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 shadow-sm transition-all outline-none" 
              placeholder="Search by User Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium tracking-wide">Loading user list...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const yellowCount = user.yellowCards?.count || 0;
                const isEffectivelyBanned = user.ban?.isBanned || yellowCount >= 3;

                return (
                  <div key={user._id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                    
                    <button 
                      onClick={() => toggleExpand(user._id)}
                      className="w-full flex justify-between items-center p-4 hover:bg-gray-50 focus:outline-none transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`text-lg font-bold ${isEffectivelyBanned ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {user.name}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md border border-gray-200">
                          ID: {user._id}
                        </span>

                        {isEffectivelyBanned && (
                          <span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full border border-red-300 font-bold flex items-center gap-1 shadow-sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                            BANNED
                          </span>
                        )}

                        {!isEffectivelyBanned && yellowCount > 0 && (
                          <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full border border-amber-300 font-bold flex items-center gap-1 shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            {yellowCount} Yellow Card{yellowCount > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedId === user._id ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>

                    {expandedId === user._id && (
                      <div className="px-5 py-6 border-t border-gray-100 bg-gray-50/50 animate-fade-in-down">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">User Profile Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
                          <div>
                            <p className="text-gray-500 mb-1.5 font-medium">Email</p>
                            <p className="font-semibold text-gray-900">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1.5 font-medium">Telephone</p>
                            <p className="font-semibold text-gray-900">{user.tel || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1.5 font-medium">Role</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded font-semibold capitalize tracking-wide">
                              {user.role}
                            </span>
                          </div>
                        </div>
                        
                        <hr className="border-gray-200 mb-5" />
                        <div className="flex justify-end">
                          <UserControls user={user} token={session?.user?.token || ''} onRefresh={fetchUsers} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
                <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">No users found.</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search query.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}