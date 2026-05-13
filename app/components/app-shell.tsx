"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import AiSidebar from "./ai-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCustomPrompt = pathname?.startsWith("/custom-prompt");

  if (isCustomPrompt) {
    return (
      <SidebarProvider>
        <div className="flex min-h-svh w-full">
          <AiSidebar />
          <SidebarInset className="flex min-h-svh w-full flex-col">
            <Header />
            <main className="flex-1 min-h-0 flex flex-col">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-svh flex w-full flex-col">
        <Header />
        <main className="flex-1 min-h-0 flex flex-col">{children}</main>
      </div>
    </SidebarProvider>
  );
}
