"use client";

import { useEffect, useMemo, useState } from "react";

import { apiFetch } from "../lib/api";
import { Button } from "./ui/button";

type Review = {
  id: number;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
  produto: {
    id: number;
    nome: string;
  };
  comentario: string;
  data: string;
};

type ReviewsResponse = {
  content: Review[];
};

type ReviewsModalProps = {
  open: boolean;
  onClose: () => void;
  productId?: number;
  productName?: string;
};

export default function ReviewsModal({
  open,
  onClose,
  productId,
  productName,
}: ReviewsModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let isMounted = true;

    async function loadReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiFetch<ReviewsResponse>(
          "http://localhost:8080/avaliacoes",
        );

        if (isMounted) {
          setReviews(data.content ?? []);
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

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [open]);

  const filteredReviews = useMemo(() => {
    if (!productId) {
      return reviews;
    }

    return reviews.filter((review) => review.produto.id === productId);
  }, [productId, reviews]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-neutral-800">
              Avaliações
            </h2>
            {productName ? (
              <p className="text-xs text-neutral-500">{productName}</p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
          >
            X
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : isLoading ? (
            <div className="text-sm text-neutral-500">Carregando...</div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-sm text-neutral-500">
              Nenhuma avaliacao encontrada.
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-neutral-200 p-3"
              >
                <div className="flex items-center justify-between text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">
                    {review.usuario.nome}
                  </span>
                  <span>{review.data}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-700">
                  {review.comentario}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
