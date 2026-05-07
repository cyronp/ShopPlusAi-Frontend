export default function Footer() {
  return (
    <>
      <div className="flex flex-row w-full bg-neutral-100 border-t-2 h-60 p-12">
        <div className="flex flex-col w-72 gap-2">
          <h2 className="text-2xl font-bold">Sua primeira loja com IA</h2>
          <p className="text-muted-foreground tracking-tighter">
            Gere relatórios automaticos e aprimore suas vendas com o poder das
            inteligências artificiais
          </p>
          <p className="uppercase text-sm tracking-tight">Construido por: Vitor Henrique, Caio de Souza, Mathias, Carlos Deretti</p>
        </div>
      </div>
    </>
  );
}
