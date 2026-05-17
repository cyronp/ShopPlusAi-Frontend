"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import { Astroid, Heart, InfoIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";
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
import { apiFetch } from "../lib/api";

type FeelingResponse = {
  resumo: {
    descricao: string;
  };
  sentimentChart: Array<{
    positive: number;
    neutral: number;
    negative: number;
  }>;
  mediaSentimento: {
    nota: number;
  };
  melhorProduto: {
    nome: string;
    categoria: string;
    sentimento: string;
    media: number;
    comentarioDestaque: string;
  };
  piorProduto: {
    nome: string;
    categoria: string;
    sentimento: string;
    media: number;
    comentarioDestaque: string;
  };
  aspectos: Array<{
    aspecto: string;
    sentimento: string;
  }>;
};

type AvaliacoesResponse = {
  content: Array<{
    data: string;
  }>;
};

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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [isPrompting, setIsPrompting] = useState(true);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [availableMonths, setAvailableMonths] = useState<number[]>([]);
  const [reportData, setReportData] = useState<FeelingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const selectedMonthLabel = selectedMonth ? months[selectedMonth - 1] : null;
  const chartMonthLabel = selectedMonthLabel
    ? selectedMonthLabel.slice(0, 3)
    : "";
  const chartData = reportData?.sentimentChart?.length
    ? reportData.sentimentChart.map((item) => ({
        ...item,
        month: chartMonthLabel,
      }))
    : [];

  const normalizedScore = Math.min(
    1,
    Math.max(0, reportData?.mediaSentimento?.nota ?? 0),
  );
  const filledHearts = Math.round(normalizedScore * 5);

  const handleGenerateReport = async () => {
    if (!selectedMonth || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiFetch<FeelingResponse>(
        `/feeling?ano=${currentYear}&mes=${selectedMonth}`,
        { baseUrl: apiBaseUrl },
      );
      setReportData(response);
      setIsPrompting(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel gerar o relatorio.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadAvailableMonths = async () => {
      try {
        const response = await apiFetch<AvaliacoesResponse>(
          "/avaliacoes",
          { baseUrl: apiBaseUrl },
        );

        const monthSet = new Set<number>();

        response.content.forEach((item) => {
          if (!item.data) return;

          const parts = item.data.split("-");
          const month = Number(parts[1]);

          if (!Number.isNaN(month)) {
            monthSet.add(month);
          }
        });

        const monthsSorted = Array.from(monthSet.values()).sort(
          (a, b) => a - b,
        );
        setAvailableMonths(monthsSorted);

        if (!selectedMonth && monthsSorted.length) {
          setSelectedMonth(monthsSorted[0]);
        }
      } catch {
        setAvailableMonths([]);
      }
    };

    void loadAvailableMonths();
  }, [apiBaseUrl, selectedMonth]);

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
                <Select
                  value={selectedMonth ? `${selectedMonth}` : ""}
                  onValueChange={(value) =>
                    setSelectedMonth(value ? Number(value) : null)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um mês" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Meses disponiveis</SelectLabel>
                      {availableMonths.length ? (
                        availableMonths.map((monthNumber) => (
                          <SelectItem
                            key={monthNumber}
                            value={`${monthNumber}`}
                          >
                            {months[monthNumber - 1]}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectLabel>Nenhum mes disponivel</SelectLabel>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  size="lg"
                  disabled={!selectedMonth || isLoading}
                  className="bg-linear-[90deg,#9c89b8_0%,#beb3d2_10%,#9c89b8_100%] bg-size-[200%,100%] text-white LoadingText cursor-pointer"
                  onClick={handleGenerateReport}
                >
                  {isLoading ? "Gerando..." : "Gerar relatório"} <Astroid />
                </Button>
                {errorMessage ? (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="flex w-full justify-center">
              <div className="inline-flex items-center gap-2 text-center">
                <h1 className="text-3xl font-semibold">
                  Relatório {selectedMonthLabel} {currentYear}
                </h1>
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
              <p>{reportData?.resumo?.descricao}</p>
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
                <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <Heart
                    key={index}
                    className={
                      index < filledHearts ? "fill-red-500 stroke-0" : undefined
                    }
                  />
                ))}
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
              <div className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Melhor produto
                  </h3>
                  <p className="text-lg font-semibold">
                    {reportData?.melhorProduto?.nome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reportData?.melhorProduto?.categoria}
                  </p>
                  <p className="mt-2 text-sm">
                    Sentimento: {reportData?.melhorProduto?.sentimento}
                  </p>
                  <p className="text-sm">
                    Media: {reportData?.melhorProduto?.media}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {reportData?.melhorProduto?.comentarioDestaque}
                  </p>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Pior produto
                  </h3>
                  <p className="text-lg font-semibold">
                    {reportData?.piorProduto?.nome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reportData?.piorProduto?.categoria}
                  </p>
                  <p className="mt-2 text-sm">
                    Sentimento: {reportData?.piorProduto?.sentimento}
                  </p>
                  <p className="text-sm">
                    Media: {reportData?.piorProduto?.media}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {reportData?.piorProduto?.comentarioDestaque}
                  </p>
                </div>
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
                    {reportData?.aspectos?.length ? (
                      reportData.aspectos.map((aspecto) => (
                        <tr key={`${aspecto.aspecto}-${aspecto.sentimento}`}>
                          <td className="px-4 py-2">{aspecto.aspecto}</td>
                          <td className="px-4 py-2">{aspecto.sentimento}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-4 py-2" colSpan={2}>
                          Nenhum aspecto encontrado.
                        </td>
                      </tr>
                    )}
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
