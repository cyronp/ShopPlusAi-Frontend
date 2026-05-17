"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import UserModal from "./ai-modal";
import { Input } from "./ui/input";
import { cn } from "@/app/lib/utils";
import SearchInput from "./search";
import type { Category, CategoryResponse } from "@/app/types/category";
import { apiFetch } from "@/app/lib/api";
import {
  ALL_CATEGORIES_LABEL,
  useCategoryFilter,
} from "./category-filter-context";

export default function Header() {
  const { activeCategory, setActiveCategory } = useCategoryFilter();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isMounted = true;

    apiFetch<CategoryResponse | Category[]>("/api/categoria")
      .then((data) => {
        if (!isMounted) {
          return;
        }

        const list = Array.isArray(data) ? data : data.content;
        setCategories(list);
      })
      .catch(() => {
        if (isMounted) {
          setCategories([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`,
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-40 grid w-full grid-cols-3 items-center border-b bg-background py-4"
      >
        {/* Icon */}
        <div className="flex px-12">
          <h1 className="text-2xl tracking-tighter">
            <a href="/">
              SHOPLUS <span className="text-amethyst-smoke-700">AI</span>
            </a>
          </h1>
        </div>
        {/* Categories */}
        <nav className="flex justify-center">
          <ul className="inline-flex gap-6 cursor-pointer *:hover:bg-neutral-100 transition-all *:p-1 *:rounded-md">
            <li
              className={cn(
                "tracking-tight text-amethyst-smoke-600",
                activeCategory === ALL_CATEGORIES_LABEL
                  ? "text-amethyst-smoke-900 underline decoration-2 decoration-amethyst-smoke-900 font-semibold underline-offset-6"
                  : "",
              )}
              onClick={() => setActiveCategory(ALL_CATEGORIES_LABEL)}
            >
              {ALL_CATEGORIES_LABEL}
            </li>
            {categories.map((category) => (
              <li
                key={category.id ?? category.nome}
                className={cn(
                  "tracking-tight text-amethyst-smoke-600",
                  activeCategory === category.nome
                    ? "text-amethyst-smoke-900 underline decoration-2 decoration-amethyst-smoke-900 font-semibold underline-offset-6"
                    : "",
                )}
                onClick={() => setActiveCategory(category.nome)}
              >
                {category.nome}
              </li>
            ))}
          </ul>
        </nav>
        {/* Admin Section */}
        <div className="flex justify-end px-12 gap-6">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full border border-neutral-300 cursor-pointer"
            onClick={() => setIsUserModalOpen((prev) => !prev)}
            aria-expanded={isUserModalOpen}
            aria-haspopup="dialog"
          >
            <Sparkles />
            {isUserModalOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </header>
      <UserModal
        open={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </>
  );
}
