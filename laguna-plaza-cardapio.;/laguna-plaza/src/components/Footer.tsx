export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-slate-800 px-4 py-9">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-base font-bold text-amber-300">Formas de pagamento</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Aceitamos dinheiro, cartões de débito e crédito e Pix. Taxa de serviço: 10%.
          </p>
        </div>
        <p className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs leading-5 text-slate-400">
          Proibida a venda de bebida alcoólica a menores de 18 anos. Se beber, não dirija. PROCON-151.
        </p>
      </div>
    </footer>
  );
}
