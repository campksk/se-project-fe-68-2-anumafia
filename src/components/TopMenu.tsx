"use client" 

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react"; 
import { useState } from "react";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
  const { data: session } = useSession();
  
  const isAdmin = session?.user?.role === "admin";
  const isCompany = session?.user?.role === "company"; 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="h-16 bg-white w-full fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-200">
      <div className="flex flex-row items-center justify-between px-6 md:px-12 h-full">
        
        <div>
          <Link href="/" onClick={closeMenu} className="font-black text-2xl text-cyan-700 tracking-tighter hover:scale-105 transition-transform flex items-center">
            <Image src="/logo.png" alt="Logo" width={200} height={200} className="w-10 h-10 mr-2" />
            <span className="hidden sm:inline-block">JobFair 2026</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-row items-center space-x-6 md:space-x-8">
          
          {!isAdmin && !isCompany && (
            <>
              <TopMenuItem title="Booked Interviews" pageRef="/mybooking" />
              <TopMenuItem title="Companies" pageRef="/companies" />
            </>
          )}

          {isCompany && (
            <TopMenuItem title="Explore Other Company" pageRef="/companies" />
          )}

          {session ? (
            <div className="flex items-center">
              {!isCompany && (
                <Link href="/profile" className="font-semibold text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-2 mr-6">
                  👤 {session.user?.name || "Profile"} 
                  {isAdmin && <span className="bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">Admin</span>}
                </Link>
              )}
              <Link href="/signout" className="font-bold text-red-600 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-1.5 rounded-full border border-red-100">
                Sign-Out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/signin" className="font-semibold text-gray-600 hover:text-cyan-600 transition-colors">
                Sign-In
              </Link>
              <Link href="/signup" className="bg-cyan-600 text-white px-5 py-2 rounded-full font-bold hover:bg-cyan-700 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5">
                Sign-Up
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none hover:text-cyan-600 transition-colors p-2">
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col px-6 py-6 space-y-5 animate-fade-in-down">
          
          {!isAdmin && !isCompany && (
            <>
              <Link href="/mybooking" onClick={closeMenu} className="font-semibold text-lg text-gray-800 hover:text-cyan-600 transition-colors">
                Booked Interviews
              </Link>
              <Link href="/companies" onClick={closeMenu} className="font-semibold text-lg text-gray-800 hover:text-cyan-600 transition-colors">
                Companies
              </Link>
              <hr className="border-gray-100 my-2" />
            </>
          )}

          {isCompany && (
            <>
              <Link href="/companies" onClick={closeMenu} className="font-semibold text-lg text-gray-800 hover:text-cyan-600 transition-colors">
                Explore Other Company
              </Link>
              <hr className="border-gray-100 my-2" />
            </>
          )}

          {session ? (
            <div className="flex flex-col space-y-5">
              {!isCompany && (
                <Link href="/profile" onClick={closeMenu} className="font-semibold text-lg text-slate-800 hover:text-cyan-800 transition-colors">
                  👤 {session.user?.name || "Profile Settings"} 
                  {isAdmin && <span className="text-sm text-gray-500 ml-2">(Admin)</span>}
                </Link>
              )}
              <Link href="/signout" onClick={closeMenu} className="font-bold text-lg text-center bg-red-50 text-red-600 py-3 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                Sign-Out
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <Link href="/signin" onClick={closeMenu} className="font-bold text-lg text-center bg-gray-50 text-gray-800 py-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                Sign-In
              </Link>
              <Link href="/signup" onClick={closeMenu} className="font-bold text-lg text-center bg-cyan-600 text-white py-3 rounded-xl shadow-md hover:bg-cyan-700 transition-colors">
                Sign-Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}