"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import UserModal from "./ai-modal";
import { Input } from "./ui/input";
import { cn } from "@/app/lib/utils";
import SearchInput from "./search";

export default function Header() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(0);

  const categories = ["Todos", "Roupas", "Bebidas", "Alimentos", "Automotivo"];
  return (
    <>
      <div className="grid grid-cols-3 items-center border-b py-4">
        {/* Icon */}
        <div className="flex px-12">
          <h1 className="text-2xl tracking-tighter">
            <a href="/">SHOPLUS <span className="text-amethyst-smoke-700">AI</span></a>
          </h1>
        </div>
        {/* Categories */}
        <div className="flex justify-center">
          <ul className="inline-flex gap-6 cursor-pointer *:hover:bg-neutral-100 transition-all *:p-1 *:rounded-md">
            {categories.map((category, index) => (
              <li
                key={index}
                className={cn(
                  "tracking-tight text-amethyst-smoke-600",
                  isActive === index
                    ? "text-amethyst-smoke-900 underline decoration-2 decoration-amethyst-smoke-900 font-semibold underline-offset-6"
                    : "",
                )}
                onClick={() => setIsActive(index)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {/* Admin Section */}
        <div className="flex justify-end px-12 gap-6">
          <SearchInput />
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full border border-neutral-300 cursor-pointer"
            onClick={() => setIsUserModalOpen((prev) => !prev)}
            aria-expanded={isUserModalOpen}
            aria-haspopup="dialog"
          >
            <Sparkles/>
            {isUserModalOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </div>
      <UserModal
        open={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </>
  );
}
