"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ShoppingCartIcon, User } from "lucide-react";
import UserModal from "./user-modal";

export default function Header() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 items-center border-b py-4">
        {/* Icon */}
        <div className="flex gap-2 px-12">
          <ShoppingCartIcon className="mt-1" size={24} />
          <h1 className="text-2xl">
            ShopPlus <span className="text-[#32b1d0]">AI</span>
          </h1>
        </div>
        {/* Categories */}
        <div className="flex justify-center">
          <ul className="inline-flex gap-6 cursor-pointer *:hover:bg-neutral-100 transition-all *:p-1 *:rounded-md">
            <li>Todos</li>
            <li>Roupas</li>
            <li>Bebidas</li>
            <li>Alimentos</li>
            <li>Automotivo</li>
          </ul>
        </div>
        {/* Admin Section */}
        <div className="flex justify-end px-12">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full border border-neutral-300 cursor-pointer"
            onClick={() => setIsUserModalOpen((prev) => !prev)}
            aria-expanded={isUserModalOpen}
            aria-haspopup="dialog"
          >
            <User />
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
