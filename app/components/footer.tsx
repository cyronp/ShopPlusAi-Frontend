import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-30 w-full border-t-2 border-amethyst-smoke-400 bg-amethyst-smoke-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-amethyst-smoke-950">
              Sua primeira loja gerenciada com IA
            </h2>
            <p className="text-sm text-muted-foreground">
              Gere relatórios automáticos, entenda o comportamento do seu
              público e aprimore suas vendas com o poder das inteligências
              artificiais.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-amethyst-smoke-700">
              <span>Vitor Henrique</span>
              <span>Caio de Souza</span>
              <span>Mathias Gruber</span>
              <span>Carlos Deretti</span>
              <span>Samuel de Souza</span>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-amethyst-smoke-900">
                Repositórios
              </span>
              <div className="flex flex-col gap-2 text-sm text-amethyst-smoke-800">
                <a
                  href="https://github.com/cyronp/ShopPlusAi-Frontend"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-amethyst-smoke-950"
                >
                  Front-end
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://github.com/cyronp/ShopPlusAi-Backend"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-amethyst-smoke-950"
                >
                  Back-end
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
