"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import gsap from "gsap";
import { Lock } from "lucide-react";
import Image from "next/image";

interface CheckoutFormProps {
  user: { id: string; name: string; email: string } | null;
}

export const CheckoutForm = ({ user }: CheckoutFormProps) => {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Paystack Configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: total * 100, // Amount in Kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  // Paystack Success Callback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    setLoading(false); // Re-enable button if payment is closed
  };

  // Form Submission Handler
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
    setLoading(true);
    initializePayment({ onSuccess, onClose });
  };

  return (
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
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-primary"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
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
              className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <Lock size={18} />{" "}
              {loading ? "Processing..." : `Pay Securely $${total.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Order Summary */}
      <div className="bg-slate-50 p-8 rounded-xl h-fit sticky top-28">
        <h2 className="text-2xl font-bold mb-6 text-brand-teal border-b pb-4">
          Order Summary
        </h2>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-teal">{item.name}</p>
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
  );
};
