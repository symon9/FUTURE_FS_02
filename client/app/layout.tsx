import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ShopVerse | Your World of Smart Shopping",
  description: "An intuitive, seamless, and enjoyable marketplace experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#023047",
              color: "#fff",
            },
          }}
        />
        <Header />

        <main className="grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
