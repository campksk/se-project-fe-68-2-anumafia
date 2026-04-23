"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-16">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-cyan-600">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Sign In</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email Address" required
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600"
            onChange={(e) => setEmail(e.target.value)} />
            
          <input type="password" placeholder="Password" required
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600"
            onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded-md hover:bg-cyan-700 transition shadow-md mt-6">
            Sign In
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <Link href="/signup" className="text-cyan-600 hover:underline">Sign-Up</Link>
        </p>
      </div>
    </main>
  );
}