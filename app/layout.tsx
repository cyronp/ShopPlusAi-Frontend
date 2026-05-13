import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import AppShell from "./components/app-shell";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${fredoka.variable} h-full antialiased`}>
      <body
        className="bg-background"
        style={{ "--header-height": "0px" } as React.CSSProperties}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
