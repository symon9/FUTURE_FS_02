import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import toast from "react-hot-toast";

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) => {
        toast.success(`${product.name} added to cart!`);
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );
          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        });
      },
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return {
              items: state.items.filter((item) => item._id !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item._id === productId ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);
