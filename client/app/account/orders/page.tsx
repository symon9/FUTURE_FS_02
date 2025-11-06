"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { Order } from "@/types";
import OrderCard from "@/components/OrderCard"; // Import the new component
import OrderHistorySkeleton from "@/components/OrderHistorySkeleton";
import { ShoppingBag } from "lucide-react";

const OrderHistoryPage = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/history");
        setOrders(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError(
          "We couldn't retrieve your order history. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, router]);

  if (loading) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8 text-brand-teal">Your Orders</h1>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrderHistorySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-brand-teal text-center">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
          <ShoppingBag size={48} className="mx-auto text-slate-400 mb-4" />
          <h2 className="text-2xl font-semibold text-brand-teal mb-2">
            No Orders Yet
          </h2>
          <p className="text-slate-500 mb-6">
            You haven&apos;t placed any orders with us. Let&apos;s change that!
          </p>
          <Link href="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
