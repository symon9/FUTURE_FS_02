/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: total * 100,
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
      .then((response) => {
        gsap.to(".success-overlay", { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          ".success-checkmark",
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.3 }
        );
        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 3000);
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
      alert("Your cart is empty.");
      return;
    }
    initializePayment({ onSuccess, onClose });
  };

  return (
    <div className="relative">
      <h1 className="text-4xl font-bold mb-8 text-brand-teal">Checkout</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-brand-teal">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Shipping Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-primary"
                  required
                />
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-brand-teal">
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <button type="submit" className="btn-primary text-lg py-3 px-12">
            Pay ${total.toFixed(2)}
          </button>
        </div>
      </form>

      <div className="success-overlay opacity-0 fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="success-checkmark scale-0 bg-white p-8 rounded-full shadow-2xl">
          <svg
            className="h-20 w-20 text-brand-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
