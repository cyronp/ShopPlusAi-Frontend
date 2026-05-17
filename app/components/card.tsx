"use client";

interface CardProps {
  name?: string;
  ratings?: number;
  category?: string;
  image?: string;
}

export default function Card({ name, ratings, category, image }: CardProps) {
  return (
    <>
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <h3 className="text-sm text-muted-foreground">{category}</h3>
          {typeof ratings === "number" ? (
            <p className="text-sm">Nota: {ratings.toFixed(1)}</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
