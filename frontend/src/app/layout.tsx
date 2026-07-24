import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusFlow AI — Enterprise Campus OS",
  description: "AI-powered Campus Operating System for AURO University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className="antialiased font-body bg-[#080d1a] text-neutral-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
