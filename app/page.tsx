"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "./components/card";
import Footer from "./components/footer";
import {
  ALL_CATEGORIES_LABEL,
  useCategoryFilter,
} from "./components/category-filter-context";
import { apiFetch } from "./lib/api";

type Product = {
  id: number;
  nome: string;
  preco: number;
  categoria: {
    id: number;
    nome: string;
  };
};

type ProductPage = {
  content: Product[];
};

export default function Home() {
  const { activeCategory } = useCategoryFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiFetch<ProductPage>(
          "http://localhost:8080/produto",
        );

        if (isMounted) {
          setProducts(data.content ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Request failed");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES_LABEL) {
      return products;
    }

    return products.filter(
      (product) => product.categoria.nome === activeCategory,
    );
  }, [activeCategory, products]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center">
        <div>
          {error ? (
            <div className="p-6 text-sm text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-5">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">
                  Carregando produtos...
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    productId={product.id}
                    name={product.nome}
                    category={product.categoria.nome}
                    preco={product.preco}
                    image={`https://picsum.photos/seed/${product.id}300/300`}
                  />
                ))
              )}
            </div>
          )}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
