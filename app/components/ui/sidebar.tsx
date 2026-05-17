import { ChevronRight } from "lucide-react";
import { Button } from "./button";

type SidebarItem = {
  id: string;
  label: string;
};

type SidebarProps = {
  items?: SidebarItem[];
  onSelect?: (id: string) => void;
  onNewChat?: () => void;
};

export default function Sidebar({
  items = [],
  onSelect,
  onNewChat,
}: SidebarProps) {
  return (
    <div className="fixed flex flex-col bg-amethyst-smoke-100 border-r-amethyst-smoke-200 border-r min-h-screen max-w-3xs min-w-3xs">
      <nav className="flex flex-col gap-1 p-4" aria-label="Recentes">
        <Button
          type="button"
          className="mb-2 w-full justify-center bg-amethyst-smoke-500"
          onClick={onNewChat}
        >
          Novo chat
        </Button>
        <h2 className="px-2 text-sm text-muted-foreground">Recentes</h2>
        {items.length === 0 ? (
          <p className="px-2 py-1 text-sm text-muted-foreground">
            Histórico não encontrado...
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <Button
                  type="button"
                  variant="ghost"
                  className="inline-flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-amethyst-smoke-200 cursor-pointer"
                  onClick={() => onSelect?.(item.id)}
                >
                  <p className="overflow-hidden text-ellipsis">{item.label}</p>
                  <ChevronRight size={16} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
