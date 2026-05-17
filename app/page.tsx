"use client";

import Card from "./components/card";
import Footer from "./components/footer";
import {
  ALL_CATEGORIES_LABEL,
  useCategoryFilter,
} from "./components/category-filter-context";

const products = [
  { id: 1, name: "Farofa", category: "Alimentos", rating: 4.2 },
  { id: 2, name: "Chocolate", category: "Alimentos", rating: 4.6 },
  { id: 3, name: "Chinelo", category: "Roupas", rating: 4.1 },
  { id: 4, name: "Camiseta", category: "Roupas", rating: 4.4 },
];

export default function Home() {
  const { activeCategory } = useCategoryFilter();
  const filteredProducts =
    activeCategory === ALL_CATEGORIES_LABEL
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <>
      <div className="flex min-h-full flex-col">
        <div>
          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                name={product.name}
                category={product.category}
                ratings={product.rating}
              />
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
