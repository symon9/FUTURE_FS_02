"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { clsx } from "clsx";
import gsap from "gsap";

// NavLink Component
const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "transition-colors duration-300",
        isActive
          ? "text-brand-teal font-semibold"
          : "text-slate-600 hover:text-brand-teal",
        "text-lg md:text-sm"
      )}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const headerRef = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Animate header entry
  useLayoutEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Disable scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center py-4">
          <div className="justify-self-start">
            <Link
              href="/"
              className="text-3xl font-extrabold text-brand-teal tracking-wide"
            >
              Zenvy
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex justify-center items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 justify-self-end">
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

            {/* Desktop User */}
            <div
              className="hidden md:flex items-center gap-4 relative"
              ref={dropdownRef}
            >
              {user ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 font-medium text-sm text-slate-700"
                  >
                    <User size={18} /> Hi, {user.name.split(" ")[0]}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <Link
                        href="/account/orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        Order History
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary py-2 px-4 text-sm inline-flex items-center"
                >
                  <LogIn size={16} className="mr-1" /> Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 animate-fade-in"
            onClick={closeMobileMenu}
          ></div>

          {/* Slide-down Menu */}
          <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl z-50 animate-slide-down h-[100vh] overflow-y-auto rounded-b-3xl border-b border-slate-200">
            {/* Top Bar (Logo + Close Button) */}
            <div className="flex items-center justify-between px-6 py-5 sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-50 rounded-b-2xl">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-3xl font-extrabold text-brand-teal tracking-wide drop-shadow-sm"
              >
                Zenvy
              </Link>

              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700 hover:text-brand-teal"
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col items-center p-8 space-y-10 animate-fade-up">
              <nav className="flex flex-col items-center space-y-6 w-full">
                <NavLink href="/" onClick={closeMobileMenu}>
                  Home
                </NavLink>
                <NavLink href="/about" onClick={closeMobileMenu}>
                  About Us
                </NavLink>
                <NavLink href="/contact" onClick={closeMobileMenu}>
                  Contact
                </NavLink>
              </nav>

              <div className="w-2/3 border-t border-slate-200 pt-8" />

              {user ? (
                <div className="flex flex-col items-center gap-6">
                  <Link
                    href="/account/orders"
                    onClick={closeMobileMenu}
                    className="text-lg text-slate-700 hover:text-brand-teal font-medium tracking-wide"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="flex items-center gap-2 text-lg text-red-500 hover:text-red-600 transition-colors font-medium"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="mt-6 bg-brand-teal text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-brand-teal/90 transition-all duration-300 flex items-center gap-2"
                >
                  <LogIn size={20} /> Login
                </Link>
              )}

              <div className="pt-10 text-sm text-slate-400">
                © {new Date().getFullYear()} Zenvy. All rights reserved.
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
