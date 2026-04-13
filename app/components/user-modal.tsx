"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Brain, Clock, X } from "lucide-react";

type UserModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function UserModal({ open, onClose }: UserModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute right-12 top-14 w-88 rounded-2xl border border-neutral-200 bg-white p-3 OpenModal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-neutral-700">
            Visualização de relatórios
          </h2>
          <Button
            className="cursor-pointer hover:bg-transparent"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <div className="mt-1 flex flex-col">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 border-b p-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <Brain size={16} className="text-neutral-500" />
            Insight de sentimento
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 border-b px-2 py-2.5 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <AlertTriangle size={16} className="text-neutral-500" />
            Principais problemas
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 px-2 py-2.5 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <Clock size={16} className="text-neutral-500" />
            Histórico
          </button>
        </div>
      </div>
    </div>
  );
}
