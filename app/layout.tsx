import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopPlus AI",
  description: "AI powered shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="bg-background flex min-h-screen flex-col">
        <Header />
        <main
          className="flex flex-1 flex-col"
          style={{ paddingTop: "var(--header-height, 0px)" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
