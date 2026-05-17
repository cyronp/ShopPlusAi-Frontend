"use client";

import { useState } from "react";

import ReviewsModal from "./reviews-modal";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface CardProps {
  productId?: number;
  name?: string;
  preco?: number;
  category?: string;
  image?: string;
}

export default function Card({
  productId,
  name,
  preco,
  category,
  image,
}: CardProps) {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white">
        <div className="absolute inset-x-0 top-0 h-24 from-amethyst-smoke-50 to-transparent" />
        <div className="relative flex flex-col gap-3 p-4">
          <div className="relative overflow-hidden rounded-xl bg-neutral-100">
            <img
              width={300}
              height={300}
              src={image}
              className="h-48 w-full object-cover"
            />
          </div>
          <Separator className="my-1" />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-neutral-900">{name}</h2>
            <p className="text-sm tracking-wide text-neutral-500">
              Categoria: {category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-neutral-900">
                R${preco}
              </span>
            </div>
            <Button
              className="bg-amethyst-smoke-700 px-4 py-2 text-sm text-white transition-colors hover:bg-amethyst-smoke-800 cursor-pointer"
              onClick={() => setIsReviewsOpen(true)}
            >
              Avaliações
            </Button>
          </div>
        </div>
      </div>
      <ReviewsModal
        open={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        productId={productId}
        productName={name}
      />
    </>
  );
}
