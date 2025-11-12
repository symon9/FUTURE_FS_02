"use client";

import { Suspense, useState, useLayoutEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { LogIn } from "lucide-react";
import gsap from "gsap";

// --- 1. THE FORM LOGIC ---
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      setAuth(response.data.token, response.data.data);
      const redirectUrl = searchParams.get("redirect");
      router.push(redirectUrl || "/");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container w-full md:w-1/2 p-8 md:p-12">
      <h2 className="text-3xl font-bold mb-2 text-brand-teal">Welcome Back!</h2>
      <p className="text-slate-500 mb-8">Sign in to continue to ShopVerse.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </p>
        )}
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
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
        <div>
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
        <div className="pt-2">
          <button
            type="submit"
            className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            disabled={loading}
          >
            <LogIn size={18} /> {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
      <div className="text-center mt-6">
        <Link
          href="/register"
          className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-brand-teal transition-colors"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

// A simple loading skeleton for the form
const FormSkeleton = () => {
  return (
    <div className="w-full md:w-1/2 p-8 md:p-12 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
      <div className="space-y-6">
        <div className="h-10 bg-slate-200 rounded"></div>
        <div className="h-10 bg-slate-200 rounded"></div>
        <div className="h-12 bg-slate-200 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // animate the static parts
    const ctx = gsap.context(() => {
      gsap.from(".image-container", {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".form-container", {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[70vh] flex items-center justify-center"
    >
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side: Image (Static) */}
        <div className="image-container relative hidden md:block md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1758273705998-05655eea4635?q=80&w=1964&auto=format&fit=crop"
            alt="Welcome to ShopVerse"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-brand-teal/40 bg-opacity-80 p-8 flex flex-col justify-end text-white">
            <h1 className="text-4xl font-extrabold mb-2">ShopVerse</h1>
            <p className="text-lg font-medium text-brand-amber">
              Your World of Smart Shopping
            </p>
          </div>
        </div>

        <Suspense fallback={<FormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
