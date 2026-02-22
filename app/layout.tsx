import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/layout-wrapper";

export const metadata: Metadata = {
  title: "Law Pilot — Legal Case Management",
  description: "Secure, intelligent case management for modern legal professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
