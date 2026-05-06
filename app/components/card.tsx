"use client"

interface CardProps{
  name?: string;
  ratings?: number;
  category?: string;
  image?: string;
}

export default function Card({name,ratings,category,image}:CardProps) {
  return(
    <>
    <div>
      <div>
        <h2>Nome produto</h2>
        <h3>Categoria Produto</h3>
      </div>
    </div>
    </>
  )
}