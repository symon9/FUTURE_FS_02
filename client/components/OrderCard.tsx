"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Order } from "@/types";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import gsap from "gsap";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the height of the collapsible content area
    gsap.to(contentRef.current, {
      height: isExpanded ? "auto" : 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [isExpanded]);

  const getLatestStatus = () => {
    if (!order.statusHistory || order.statusHistory.length === 0)
      return "Pending";
    const latestStatus =
      order.statusHistory[order.statusHistory.length - 1].status;
    return latestStatus.charAt(0).toUpperCase() + latestStatus.slice(1);
  };

  const status = getLatestStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg transition-shadow hover:shadow-2xl">
      {/* Card Header - Always Visible */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-sm text-slate-500">Order ID</p>
            <p className="font-mono text-sm text-brand-teal">{order._id}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0 md:gap-8 text-center md:text-left">
            <div>
              <p className="text-sm text-slate-500">Date Placed</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="font-bold text-brand-teal">
                ${order.financials.totalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <span
                className={clsx(
                  "px-3 py-1 text-sm font-semibold rounded-full",
                  {
                    "bg-green-100 text-green-800": status === "Delivered",
                    "bg-amber-100 text-amber-800": status !== "Delivered",
                  }
                )}
              >
                {status}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <ChevronDown
              size={24}
              className={`text-slate-500 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div ref={contentRef} className="h-0 overflow-hidden">
        <div className="px-6 pb-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-brand-teal mb-4">
            Items Ordered
          </h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-brand-teal">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
