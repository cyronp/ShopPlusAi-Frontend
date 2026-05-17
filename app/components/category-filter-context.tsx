"use client";

import { createContext, useContext, useState } from "react";

type CategoryFilterContextValue = {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
};

const CategoryFilterContext = createContext<CategoryFilterContextValue | null>(
  null,
);

export const ALL_CATEGORIES_LABEL = "Todos";

export function CategoryFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES_LABEL);

  return (
    <CategoryFilterContext.Provider
      value={{ activeCategory, setActiveCategory }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter() {
  const context = useContext(CategoryFilterContext);

  if (!context) {
    throw new Error(
      "useCategoryFilter must be used within CategoryFilterProvider",
    );
  }

  return context;
}
