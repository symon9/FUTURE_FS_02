"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { CheckoutForm } from "@/components/CheckoutForm";

const CheckoutPage = () => {
  const router = useRouter();
  const pathname = usePathname(); // Gets the current path, e.g., '/checkout'
  const { user, token } = useAuthStore();
  const { items } = useCartStore();

  // A state to prevent showing the form before authentication and cart checks are complete
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // This effect handles all the protection logic for the page.
    // We add a small delay to ensure Zustand has hydrated its state from localStorage.
    const protectionTimer = setTimeout(() => {
      // 1. Check for Authentication: If there's no token, the user is not logged in.
      if (!token) {
        // Redirect to the login page, but also pass the current path as a 'redirect' query parameter.
        // This tells the login page where to send the user back to after a successful login.
        const redirectUrl = `/login?redirect=${pathname}`;
        router.replace(redirectUrl);
        return; // Stop further execution in this effect
      }

      // 2. Check for an Empty Cart: If the user is logged in but their cart is empty.
      if (items.length === 0) {
        // Redirect them to the homepage.
        router.replace("/");
        return;
      }

      // 3. If all checks pass, we can safely show the page content.
      setIsReady(true);
    }, 200); // 200ms is a safe delay for state hydration.

    // Cleanup function to clear the timer if the component unmounts.
    return () => clearTimeout(protectionTimer);
  }, [token, items, router, pathname]);

  // While the checks are running, display a clear loading/authentication message.
  // This prevents a "flash of unstyled content" or an empty page.
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

      {/* The form is only rendered after all checks have passed.
          The 'key' ensures the form resets if the user somehow changes. */}
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
