"use client";

import { useState, useLayoutEffect, useRef } from "react";
// --- 1. IMPORT useSearchParams ---
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { LogIn } from "lucide-react";
import gsap from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // --- 2. INITIALIZE useSearchParams ---
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  const containerRef = useRef(null);

  // Your GSAP animation logic is perfect and remains unchanged
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-container", {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".image-container", {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      setAuth(response.data.token, response.data.data);

      // --- 3. THE REDIRECT LOGIC ---
      // Read the 'redirect' query parameter from the URL.
      // e.g., if the URL is /login?redirect=/checkout, this will be '/checkout'.
      const redirectUrl = searchParams.get("redirect");

      // If a redirectUrl exists, push the user there.
      // Otherwise, send them to the default homepage.
      router.push(redirectUrl || "/");
      // -----------------------------
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[70vh] flex items-center justify-center"
    >
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side: Image and Branding */}
        <div className="image-container relative hidden md:block md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1579752329205-3e20e88835b3?q=80&w=1964&auto=format&fit=crop"
            alt="Welcome to ShopVerse"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-brand-teal bg-opacity-80 p-8 flex flex-col justify-end text-white">
            <h1 className="text-4xl font-extrabold mb-2">ShopVerse</h1>
            <p className="text-lg font-medium text-brand-amber">
              Your World of Smart Shopping
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="form-container w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2 text-brand-teal">
            Welcome Back!
          </h2>
          <p className="text-slate-500 mb-8">
            Sign in to continue to ShopVerse.
          </p>
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
      </div>
    </div>
  );
}
