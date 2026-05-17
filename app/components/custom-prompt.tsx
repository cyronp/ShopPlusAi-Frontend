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
import {
  isSpeechRecognitionSupported,
  SpeechToText,
} from "../utils/speech-to-text";
import { apiFetch } from "../lib/api";

type ChatApiMessage = {
  id: number;
  conversationId: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  createdAt: string;
};

type ChatMessage = {
  id?: number;
  role: "user" | "assistant";
  text: string;
  isNew?: boolean;
};

type CustomPromptProps = {
  activeConversationId?: string | null;
  onConversationChange?: (id: string | null) => void;
};

const textMapping = [
  "Quais os meus melhores itens?",
  "Como estão meus comentários?",
  "Me dê dicas de novos produtos.",
  "Quais datas estou mais vendendo?",
  "Faça um resumo das minhas vendas do mês.",
];

export default function CustomPrompt({
  activeConversationId = null,
  onConversationChange,
}: CustomPromptProps) {
  const chatBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [hintText, setHintText] = useState(textMapping[0]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(
    activeConversationId,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const maxCharacters = 120 - inputValue.length;
  const indexRef = useRef(0);
  const sttRef = useRef<SpeechToText | null>(null);
  const baseInputRef = useRef("");

  const loadConversation = async (targetId: string) => {
    const data = await apiFetch<ChatApiMessage[]>(`/chat/${targetId}`, {
      baseUrl: chatBaseUrl,
    });
    const normalized: ChatMessage[] = data.map((message) => {
      const role: ChatMessage["role"] =
        message.role === "USER" ? "user" : "assistant";

      return {
        id: message.id,
        role,
        text: message.content,
        isNew: false,
      };
    });
    setMessages(normalized);
  };

  const replacePendingAssistant = (text: string) => {
    setMessages((prev) => {
      const next = [...prev];

      for (let i = next.length - 1; i >= 0; i -= 1) {
        if (next[i].role === "assistant" && next[i].text === "") {
          next[i] = { ...next[i], text, isNew: true };
          return next;
        }
      }

      return [...next, { role: "assistant", text, isNew: true }];
    });
  };

  const handleSend = async () => {
    const messageText = inputValue.trim();

    if (!messageText || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: messageText, isNew: false },
      { role: "assistant", text: "", isNew: true },
    ]);
    setInputValue("");
    setIsLoading(true);

    try {
      const payload: {
        question: string;
        usuarioId: number;
        conversationId?: string;
      } = {
        question: messageText,
        usuarioId: 1,
      };

      if (conversationId) {
        payload.conversationId = conversationId;
      }

      const response = await apiFetch<ChatApiMessage>("/chat", {
        baseUrl: chatBaseUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.conversationId) {
        if (response.conversationId !== conversationId) {
          setConversationId(response.conversationId);
          onConversationChange?.(response.conversationId);
        }
        await loadConversation(response.conversationId);
      } else if (response.content) {
        replacePendingAssistant(response.content);
      }
    } catch (error) {
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar a mensagem agora.";

      replacePendingAssistant(fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % textMapping.length;
      setHintText(textMapping[indexRef.current]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (activeConversationId === conversationId) return;

    setConversationId(activeConversationId);

    if (activeConversationId) {
      void loadConversation(activeConversationId);
      return;
    }

    setMessages([]);
  }, [activeConversationId, conversationId]);

  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSpeechSupported(supported);

    if (!supported) return;

    const stt = new SpeechToText("pt-BR", {
      onTranscript: (final, interim) => {
        const combined =
          `${baseInputRef.current}${final}${interim}`.trimStart();
        setInputValue(combined);
      },
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onError: () => setIsListening(false),
    });

    sttRef.current = stt;

    return () => {
      stt.stop();
      sttRef.current = null;
    };
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
                      ) : message.text && message.isNew ? (
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
                        <p>{message.text}</p>
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
              onClick={handleSend}
            >
              Enviar
            </InputGroupButton>
            <InputGroupButton
              className="cursor-pointer"
              size="icon-sm"
              variant="ghost"
              disabled={!isSpeechSupported}
              aria-pressed={isListening}
              title={
                isSpeechSupported
                  ? isListening
                    ? "Parar gravacao"
                    : "Falar agora"
                  : "Navegador sem suporte a reconhecimento de voz"
              }
              onClick={() => {
                if (!isSpeechSupported || !sttRef.current) return;

                if (isListening) {
                  sttRef.current.stop();
                  return;
                }

                baseInputRef.current = inputValue.trim()
                  ? `${inputValue.trim()} `
                  : "";
                sttRef.current.clear();
                sttRef.current.start();
              }}
            >
              <MicIcon
                size={32}
                className={isListening ? "text-amethyst-smoke-700" : undefined}
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
