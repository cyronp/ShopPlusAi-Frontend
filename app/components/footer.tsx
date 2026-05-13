import { ChevronRightIcon } from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-30 flex w-full flex-row bg-amethyst-smoke-300 border-t-2 border-amethyst-smoke-400 h-60 p-12 gap-12">
        <div className="flex flex-col w-72 gap-4">
          <h2 className="text-2xl font-semibold">Sua primeira loja com IA</h2>
          <p className="text-muted-foreground tracking-tighter">
            Gere relatórios automaticos e aprimore suas vendas com o poder das
            inteligências artificiais
          </p>
          <p className="uppercase text-sm tracking-tight">
            Construido por: Vitor Henrique, Caio de Souza, Mathias, Carlos
            Deretti
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold">
            Acesse nossos repositórios:
          </span>
          <div className="flex flex-col">
            <a
              href="https://github.com/cyronp/ShopPlusAi-Frontend"
              target="_blank"
              className="flex flex-row items-center gap-1"
            >
              Front-end
              <ChevronRightIcon size={16} />
            </a>
            <a
              href="https://github.com/cyronp/ShopPlusAi-Backend"
              target="_blank"
              className="flex flex-row items-center gap-1"
            >
              Back-end
              <ChevronRightIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
