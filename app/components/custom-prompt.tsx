"use client";

import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../components/ui/input-group";
import { BotMessageSquareIcon, MicIcon } from "lucide-react";
import Typewriter from "typewriter-effect";

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
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="flex flex-1 w-full items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-2 items-center w-full max-w-4xl px-4">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl text-center font-semibold text-amethyst-smoke-900">
              Oque deseja descobrir sobre sua loja?
            </h2>
            <h3
              key={hintText}
              className="text-md text-center text-amethyst-smoke-600 moveUpBlur"
            >
              {hintText}
            </h3>
          </div>
        ) : (
          <></>
        )}
        {messages.length > 0 ? (
          <div className="flex flex-col w-full max-h-[55vh] overflow-y-auto py-4 pr-4 gap-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "user" ? (
                  <div className="rounded-xl rounded-ee-none bg-amethyst-smoke-100 p-2 max-w-[50%]">
                    <p className="max-h-24 overflow-hidden wrap-break-word">
                      {message.text}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-full">
                    <div className="inline-flex gap-2 items-center">
                      <BotMessageSquareIcon
                        size={24}
                        className="text-amethyst-smoke-800"
                      />
                      <p className="text-sm text-amethyst-smoke-800">
                        ShopPlusAI Assistant
                      </p>
                    </div>
                    {index === messages.length - 1 ? (
                      isLoading ? (
                        <p className="text-sm bg-linear-[90deg,#525252_0%,#bababa_10%,#525252_100%] bg-size-[200%,100%] text-transparent bg-clip-text LoadingText">
                          Sumarizando...
                        </p>
                      ) : message.text ? (
                        <Typewriter
                          options={{
                            delay: 15,
                            cursor: "",
                          }}
                          onInit={(typewriter) => {
                            typewriter.typeString(message.text).start();
                          }}
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        <InputGroup className="bg-white z-10 w-full">
          <InputGroupTextarea
            placeholder="Pergunte qualquer coisa"
            value={inputValue}
            maxLength={120}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-xs text-muted-foreground">
              {maxCharacters} caracteres restantes
            </InputGroupText>
            <InputGroupButton
              className="ml-auto text-white bg-amethyst-smoke-700 cursor-pointer"
              size="sm"
              variant="outline"
              onClick={() => {
                const messageText = inputValue.trim();

                if (!messageText) return;

                const responseText =
                  "Recebi sua mensagem. Vou analisar e te responder com os melhores insights para sua loja.";

                setMessages((prev) => [
                  ...prev,
                  { role: "user", text: messageText },
                  { role: "assistant", text: "" },
                ]);
                setInputValue("");
                setIsLoading(true);

                setTimeout(() => {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.role === "assistant" && m.text === ""
                        ? { ...m, text: responseText }
                        : m,
                    ),
                  );
                  setIsLoading(false);
                }, 10000);
              }}
            >
              Enviar
            </InputGroupButton>
            <InputGroupButton
              className="cursor-pointer"
              size="icon-sm"
              variant="ghost"
            >
              <MicIcon size={32} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
