"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", tel: "" });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ruleAccepted, setRuleAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const backendUrl = typeof window === 'undefined' ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          tel: formData.tel,
          role: "user" 
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Registration Successful! Please Sign-In.");
      router.push("/signin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleAccepted(e.target.checked);
  };

  const isButtonDisabled = !ruleAccepted;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-16">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-cyan-600">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Create an Account</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600"
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <input type="tel" placeholder="Telephone Number" required
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600"
            onChange={(e) => setFormData({...formData, tel: e.target.value})} />
            
          <input type="email" placeholder="Email Address" required
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
            
          <input type="password" placeholder="Password (min 6 chars)" required minLength={6}
            className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-cyan-600"
            onChange={(e) => {
              setFormData({...formData, password: e.target.value});
              if(passwordError) setPasswordError("");
            }} />

          <div className="relative">
            <input type="password" placeholder="Confirm Password" required
              className={`w-full border-b-2 py-2 focus:outline-none ${passwordError ? 'border-red-500' : 'border-gray-300 focus:border-cyan-600'}`}
              onChange={(e) => {
                setFormData({...formData, confirmPassword: e.target.value});
                if(passwordError) setPasswordError("");
              }} />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input type="checkbox" id="ruleCheckbox" checked={ruleAccepted} onChange={handleCheckboxChange} className="w-4 h-4 cursor-pointer accent-cyan-600"/>
            <label htmlFor="termsCheckbox" className="text-sm text-gray-600 cursor-pointer ">
              I agree to the <Link href="/rulesanddatapolicy" target="_blank" className="text-cyan-600 hover:underline">terms and conditions</Link>
            </label>
          </div>

          <button type="submit" disabled={isButtonDisabled}
          className={`w-full font-bold py-3 rounded-md transition shadow-md mt-6 ${isButtonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-cyan-600 text-white hover:bg-cyan-700'}`}>
            Register
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link href="/signin" className="text-cyan-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </main>
  );
}