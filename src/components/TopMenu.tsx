"use client" 

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react"; 
import { useState } from "react";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const bookingText = isAdmin ? "Manage Booking" : "Booked Interviews";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="h-16 bg-white w-full fixed top-0 left-0 right-0 z-50 shadow-md border-b border-gray-200">
      <div className="flex flex-row items-center justify-between px-6 md:px-12 h-full">
        <div>
          <Link href="/" onClick={closeMenu} className="font-black text-2xl text-cyan-700 tracking-tighter hover:scale-105 transition-transform inline-block">
            <Image src="/logo.png" alt="Logo" width={200} height={200} className="w-12 h-12 inline-block mr-2" />
          </Link>
        </div>
        <div className="hidden md:flex flex-row items-center space-x-6 md:space-x-8">
          {isAdmin?(<TopMenuItem title="Manage Review" pageRef="/manage/reviews"  />):(<></>)}
          <TopMenuItem title={bookingText} pageRef="/mybooking"  />
          <TopMenuItem title="Companies" pageRef="/companies"  />
          {session ? (
            <>
              <Link href="/profile" className="font-semibold text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-2">
                👤 {session.user?.name || "Profile"}
              </Link>
              <Link href="/signout" className="font-bold text-red-600 hover:text-red-700 transition-colors ml-4 bg-red-50 px-4 py-1.5 rounded-full">
                Sign-Out
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" className="font-semibold text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-2">
                Sign-In
              </Link>
              <Link href="/signup" className="bg-cyan-600 text-white px-5 py-2 rounded-full font-bold hover:bg-cyan-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Sign-Up
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 focus:outline-none hover:text-cyan-600 transition-colors p-2">
            {isMobileMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex flex-col px-6 py-6 space-y-5 animate-fade-in-down">
          
          <Link href="/mybooking" onClick={closeMenu} className="font-semibold text-lg text-gray-800 hover:text-cyan-600 transition-colors">
            Booking Interviews
          </Link>
          
          <Link href="/companies" onClick={closeMenu} className="font-semibold text-lg text-gray-800 hover:text-cyan-600 transition-colors">
            Companies
          </Link>

          <hr className="border-gray-200 my-2" />

          {session ? (
            <div className="flex flex-col space-y-5">
              <Link href="/profile" onClick={closeMenu} className="font-semibold text-lg text-cyan-700 hover:text-cyan-800 transition-colors">
                👤 {session.user?.name || "Profile Settings"}
              </Link>
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