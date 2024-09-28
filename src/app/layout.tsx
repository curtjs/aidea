import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "aidea",
  description: "An AI powered programming idea generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
