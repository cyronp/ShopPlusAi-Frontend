"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../components/ui/input-group";

const textMapping = [
  "Quais os meus melhores itens?",
  "Como estão meus comentários?",
  "Me dê dicas de novos produtos.",
  "Quais datas estou mais vendendo?",
  "Faça um resumo das minhas vendas do mês.",
];

export default function CustomPrompt() {
  const [hintText, setHintText] = useState(textMapping[0]);
  const [inputValue, setInputValue] = useState("");
  const maxCharacters = 120 - inputValue.length;
  const indexRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % textMapping.length;
      setHintText(textMapping[indexRef.current]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex w-full min-h-[calc(100vh-73px)] justify-center items-center">
        <div className="flex flex-col gap-2 items-center w-full max-w-3xl px-4">
          <h2 className="text-3xl text-center font-semibold">
            Oque deseja descobrir sobre sua loja?
          </h2>
          <h3
            key={hintText}
            className="text-md text-center text-muted-foreground moveUpBlur"
          >
            {hintText}
          </h3>
          <InputGroup className="bg-white z-10 w-full">
            <InputGroupTextarea
              placeholder="Pergunte qualquer coisa"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs text-muted-foreground">
                {maxCharacters} caracteres restantes
              </InputGroupText>
              <InputGroupButton
                className="ml-auto text-black cursor-pointer"
                size="sm"
                variant="outline"
              >
                Enviar
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </>
  );
}
