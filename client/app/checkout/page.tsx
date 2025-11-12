"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

import dynamic from "next/dynamic";

// --- 2. DYNAMICALLY IMPORT THE CheckoutForm COMPONENT ---
const CheckoutForm = dynamic(
  () => import("@/components/CheckoutForm").then((mod) => mod.CheckoutForm),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl h-fit">
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-6"></div>
            <div className="h-16 bg-slate-200 rounded mb-4"></div>
            <div className="h-16 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
  }
);

const CheckoutPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();
  const { items } = useCartStore();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // This effect handles all the protection logic for the page.
    const protectionTimer = setTimeout(() => {
      // 1. Check for Authentication
      if (!token) {
        const redirectUrl = `/login?redirect=${pathname}`;
        router.replace(redirectUrl);
        return;
      }

      // 2. Check for an Empty Cart
      if (items.length === 0) {
        router.replace("/");
        return;
      }

      // 3. If all checks pass, we can show the page content.
      setIsReady(true);
    }, 200);

    return () => clearTimeout(protectionTimer);
  }, [token, items, router, pathname]);

  // While checks are running, display a clear loading message.
  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-semibold text-brand-teal">
          Securing Your Session...
        </h2>
        <p className="text-slate-500 mt-2">
          Please wait while we prepare your checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-teal">
          Complete Your Order
        </h1>
        <p className="text-slate-500 mt-2">
          Just a few details and you&apos;ll be on your way.
        </p>
      </div>

      <CheckoutForm key={user?.id || "guest-checkout"} user={user} />

      {/* The success overlay remains here, controlled by GSAP from within the CheckoutForm component */}
      <div className="success-overlay opacity-0 pointer-events-none fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="success-card opacity-0 bg-white p-8 rounded-2xl shadow-2xl text-center">
          <svg
            className="h-24 w-24 text-brand-green mx-auto"
            fill="none"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="5"
              strokeOpacity="0.2"
            />
            <path
              className="success-checkmark"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              d="M25 50 L45 70 L75 30"
            />
          </svg>
          <h2 className="success-message opacity-0 -translate-y-4 text-2xl font-bold text-brand-teal mt-6">
            Payment Successful!
          </h2>
          <p className="text-slate-500 mt-2">Thank you for your order.</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
