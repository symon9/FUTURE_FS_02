"use client";

import { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Pre-fill form with user data if available
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: total * 100, // Amount in Kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    const orderData = {
      paymentReference: reference.reference,
      customerInfo: { name, email, phone },
      shippingAddress: {
        street: address,
        city: "N/A",
        state: "N/A",
        postalCode: "N/A",
        country: "N/A",
      },
      items: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      financials: { shipping: 0, tax: 0 },
    };

    api
      .post("/orders", orderData)
      .then(() => {
        const tl = gsap.timeline();
        // Make the overlay clickable and fade it in
        tl.set(".success-overlay", { pointerEvents: "auto" })
          .to(".success-overlay", { opacity: 1, duration: 0.3 })
          .fromTo(
            ".success-card",
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          )
          .fromTo(
            ".success-checkmark",
            { strokeDashoffset: 1000 },
            { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" },
            "-=0.2"
          )
          .to(".success-message", { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");

        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 4000);
      })
      .catch((error) => {
        console.error("Failed to create order:", error);
        alert("Failed to create your order. Please contact support.");
      });
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) {
      alert("Please fill all required fields");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      router.push("/");
      return;
    }
    initializePayment({ onSuccess, onClose });
  };

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-teal">
          Complete Your Order
        </h1>
        <p className="text-slate-500 mt-2">
          Just a few details and you will be on your way.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Form */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-brand-teal">
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
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
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
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
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-primary"
                placeholder="Optional"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Full Shipping Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-primary min-h-[100px]"
                required
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2"
              >
                <Lock size={18} />
                Pay Securely
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-slate-50 p-8 rounded-xl h-fit sticky top-28">
          <h2 className="text-2xl font-bold mb-6 text-brand-teal border-b pb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-teal">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">
                Your cart is empty.
              </p>
            )}
          </div>
          <hr className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between font-bold text-2xl text-brand-teal">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* THE FIX: Add pointer-events-none by default */}
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
}
