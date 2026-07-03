import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yehbon Public School | Excellence in Learning",
  description: "Nurturing young minds and architecting elite academic roadmaps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col justify-between text-slate-800`}>
        <div className="flex flex-col min-h-screen w-full">
          {/* Header Navigation Section */}
          <Navbar />
          
          {/* Main Context Dynamic Render Viewport */}
          <main className="flex-grow w-full">
            {children}
          </main>
          
          {/* Global Institutional Footer Section */}
          <Footer />
        </div>
      </body>
    </html>
  );
}