"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import { Astroid, Heart, InfoIcon, Star } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
const sentimentData = [
  { month: "Jun", positive: 1700, neutral: 1100, negative: 320 },
];

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const sentimentChartConfig = {
  positive: { label: "Positivo", color: "#22c55e" },
  neutral: { label: "Neutro", color: "#64748b" },
  negative: { label: "Negativo", color: "#ef4444" },
} satisfies ChartConfig;

export default function Page() {
  const [isPrompting, setIsPrompting] = useState(true);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <main className="flex w-full justify-center">
      <div className="w-full max-w-5xl py-4">
        {isPrompting ? (
          <>
            <div className="flex min-h-[70vh] flex-col gap-4 w-full justify-center items-center">
              <div className="text-center">
                <h1 className="text-2xl">Bem vindo a Analise de Sentimento</h1>
                <p>
                  Aqui você irá gerar uma analise de sentimento de seus produtos
                  em um mês selecionado.
                </p>
              </div>
              <div className="flex flex-col w-full max-w-64 justify-center align-center gap-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um mês" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectLabel>Meses disponiveis</SelectLabel>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                size="lg"
                className="bg-linear-[90deg,#9c89b8_0%,#beb3d2_10%,#9c89b8_100%] bg-size-[200%,100%] text-white LoadingText cursor-pointer"
                onClick={() => setIsPrompting(false)}
              >
                Gerar relatório <Astroid />
              </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="flex w-full justify-center">
              <div className="inline-flex items-center gap-2 text-center">
                <h1 className="text-3xl font-semibold">Relatório DATE</h1>
                <div
                  className="relative"
                  onMouseEnter={() => setIsDisclaimerOpen(true)}
                  onMouseLeave={() => setIsDisclaimerOpen(false)}
                >
                  <button
                    type="button"
                    className="inline-flex items-center justify-center"
                    aria-label="Abrir informacoes do relatorio"
                  >
                    <InfoIcon size={16} />
                  </button>
                  {isDisclaimerOpen && (
                    <div
                      className="absolute top-full bg-white z-50 mt-1 w-64 rounded-xl border p-3 text-center"
                      role="note"
                    >
                      <h2 className="font-bold">Conteudo gerado por IA</h2>
                      <p className="text-sm">
                        Este contéudo foi gerado por inteligência artificial,
                        sempre confira os valores com seus dados oficiais.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        A inteligência artificial pode cometer erros
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section className="my-4 text-center" aria-label="Conteudo">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
                officiis omnis commodi tempora sequi, aut quia recusandae nemo
                temporibus perspiciatis est nihil eius id repellendus accusamus
                autem possimus incidunt veritatis!
              </p>
            </section>
            <Separator />
            <section className="my-4" aria-label="Visao geral">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-xl font-semibold">
                  Panorama de sentimento
                </h2>
                <p className="text-sm text-muted-foreground">
                  Comparativo de sentimentos detectados.
                </p>
              </div>

              <ChartContainer
                config={sentimentChartConfig}
                className="mt-4 h-72 w-full"
              >
                <BarChart data={sentimentData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="positive"
                    fill="var(--color-positive)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="neutral"
                    fill="var(--color-neutral)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="negative"
                    fill="var(--color-negative)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </section>
            <Separator />
            <section className="my-4" aria-label="Visao geral">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-xl font-semibold">
                  Média geral de sentimento
                </h2>
                <p className="text-sm text-muted-foreground">
                  Nota média dos sentimentos das avaliações.
                </p>
              </div>
              <div className="inline-flex items-center justify-center w-full py-4 gap-1 ">
                <Heart className="fill-red-500 stroke-0" />
                <Heart className="fill-red-500 stroke-0" />
                <Heart className="fill-red-500 stroke-0" />
                <Heart className="fill-red-500 stroke-0" />
                <Heart />
              </div>
            </section>
            <Separator />
            <section className="my-4" aria-label="Visao geral">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-xl font-semibold">Melhor e Pior produto</h2>
                <p className="text-sm text-muted-foreground">
                  Nota média dos sentimentos das avaliações.
                </p>
              </div>
              <div className="inline-flex items-center justify-center w-full py-4 gap-1 ">
                {/* Colocar Card aqui */}
              </div>
            </section>
            <Separator />
            <section className="my-4" aria-label="Aspect-based sentiment">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-xl font-semibold">
                  Qualidade dos processos
                </h2>
                <p className="text-sm text-muted-foreground">
                  Insight dos processos importantes para o funcionamento do
                  ecommerce.
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Aspecto</th>
                      <th className="px-4 py-2 font-semibold">Sentimento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2">Entrega</td>
                      <td className="px-4 py-2">Negativo</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Qualidade</td>
                      <td className="px-4 py-2">Positivo</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Preco</td>
                      <td className="px-4 py-2">Neutro</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Atendimento</td>
                      <td className="px-4 py-2">Positivo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
