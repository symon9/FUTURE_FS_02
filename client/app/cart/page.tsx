"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4 text-brand-teal">
          Your Cart is Empty
        </h1>
        <p className="text-slate-500 mb-8">
          Looks like you havent added anything to your cart yet.
        </p>
        <Link href="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-brand-teal">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg text-brand-teal">
                    {item.name}
                  </h2>
                  <p className="text-slate-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-2 hover:bg-slate-100 rounded-l-lg"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-2 hover:bg-slate-100 rounded-r-lg"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
          <h2 className="text-2xl font-bold border-b pb-4 text-brand-teal">
            Order Summary
          </h2>
          <div className="space-y-4 my-4">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-xl my-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="w-full">
            <button className="btn-primary w-full text-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
