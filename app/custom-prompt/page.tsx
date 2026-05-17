"use client";

import { useCallback, useEffect, useState } from "react";
import CustomPrompt from "../components/custom-prompt";
import Sidebar from "../components/ui/sidebar";
import { apiFetch } from "../lib/api";

type ChatHistoryItem = {
  usuarioId: number;
  conversationId: string;
  createdAt: string;
};

type ChatApiMessage = {
  id: number;
  conversationId: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  createdAt: string;
};

const buildHistoryLabel = (content: string) => {
  const cleaned = content.replace(/\s+/g, " ").trim();

  if (!cleaned) {
    return "Conversa sem titulo";
  }

  const words = cleaned.split(" ");
  const preview = words.slice(0, 6).join(" ");

  return words.length > 6 ? `${preview}...` : preview;
};

export default function Page() {
  const chatBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [historyItems, setHistoryItems] = useState<
    { id: string; label: string }[]
  >([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const loadHistory = useCallback(async () => {
    try {
      const conversations = await apiFetch<ChatHistoryItem[]>(
        "/chat?usuarioId=1",
        {
          baseUrl: chatBaseUrl,
        },
      );

      const byConversationId = new Map<string, ChatHistoryItem>();

      conversations.forEach((conversation) => {
        const current = byConversationId.get(conversation.conversationId);

        if (!current) {
          byConversationId.set(conversation.conversationId, conversation);
          return;
        }

        const currentTime = new Date(current.createdAt).getTime();
        const candidateTime = new Date(conversation.createdAt).getTime();

        if (!Number.isNaN(candidateTime) && candidateTime >= currentTime) {
          byConversationId.set(conversation.conversationId, conversation);
        }
      });

      const uniqueConversations = Array.from(byConversationId.values()).sort(
        (left, right) =>
          new Date(right.createdAt).getTime() -
          new Date(left.createdAt).getTime(),
      );

      const items = await Promise.all(
        uniqueConversations.map(async (conversation) => {
          try {
            const messages = await apiFetch<ChatApiMessage[]>(
              `/chat/${conversation.conversationId}`,
              {
                baseUrl: chatBaseUrl,
              },
            );
            const firstContent =
              messages.find((message) => message.content?.trim())?.content ??
              "";

            return {
              id: conversation.conversationId,
              label: buildHistoryLabel(firstContent),
            };
          } catch {
            return {
              id: conversation.conversationId,
              label: "Conversa sem titulo",
            };
          }
        }),
      );

      setHistoryItems(items);
    } catch {
      setHistoryItems([]);
    }
  }, [chatBaseUrl]);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  const handleConversationChange = (id: string | null) => {
    setActiveConversationId(id);
    void loadHistory();
  };

  return (
    <>
      <Sidebar
        items={historyItems}
        onSelect={setActiveConversationId}
        onNewChat={() => setActiveConversationId(null)}
      />
      <CustomPrompt
        activeConversationId={activeConversationId}
        onConversationChange={handleConversationChange}
      />
    </>
  );
}
