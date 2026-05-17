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
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-1">
          <img width={300} height={300} src={image} />
          <Separator className="my-2" />
          <h2 className="text-lg font-semibold">{name}</h2>
          <h3 className="text-sm text-muted-foreground">
            Categoria: {category}
          </h3>
          <div className="flex flex-row items-center justify-between">
            <p>R${preco}</p>
            <Button
              className="bg-amethyst-smoke-500 p-4 cursor-pointer"
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
