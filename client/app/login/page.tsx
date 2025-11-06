"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      setAuth(response.data.token, response.data.data);
      router.push("/");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-2 text-center text-brand-teal">
        Welcome Back!
      </h1>
      <p className="text-slate-500 text-center mb-8">
        Sign in to continue to ShopVerse.
      </p>
      <form onSubmit={handleSubmit}>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-primary"
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
          <Link
            href="/register"
            className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-slate-800 mt-4"
          >
            Dont have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
