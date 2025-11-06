"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { UserPlus } from "lucide-react";
import gsap from "gsap";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const containerRef = useRef(null);

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
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { token, data } = response.data;
      setAuth(token, data);
      router.push("/");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to register. Please try again.");
      }
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
            src="https://images.unsplash.com/photo-1758523669763-ca7959730044?q=80&w=1974&auto=format&fit=crop"
            alt="Join ShopVerse"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-brand-green/40 bg-opacity-70 p-8 flex flex-col justify-end text-white">
            <h1 className="text-4xl font-extrabold mb-2">Join ShopVerse</h1>
            <p className="text-lg font-medium text-white">
              Create an account to begin your smart shopping journey.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="form-container w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2 text-brand-teal">
            Create an Account
          </h2>
          <p className="text-slate-500 mb-8">
            Join the ShopVerse community today!
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
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-primary"
                required
              />
            </div>
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
                <UserPlus size={18} />{" "}
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-brand-teal transition-colors"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
