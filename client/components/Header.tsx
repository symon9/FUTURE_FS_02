"use client";

import Link from "next/link";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive ? "text-brand-teal" : "text-slate-600 hover:text-brand-teal"
      }`}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const headerRef = useRef(null);
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useLayoutEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm lg:px-14"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-3xl font-extrabold text-brand-teal tracking-wide"
          >
            ShopVerse
          </Link>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="relative text-slate-600 hover:text-brand-teal transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-brand-amber text-brand-teal font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-primary py-2 px-4 text-sm inline-flex items-center"
              >
                <LogIn size={16} className="mr-1" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
