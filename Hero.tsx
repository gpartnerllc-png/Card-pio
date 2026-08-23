export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-7 pt-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="flex flex-col justify-center rounded-3xl border border-amber-300/15 bg-slate-900/70 p-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.26em] text-amber-300">
          Sabores para uma boa viagem
        </p>
        <h2 className="font-serif max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          Uma pausa deliciosa, do seu jeito.
        </h2>
        <p className="mt-4 max-w-xl leading-7 text-slate-300">
          Escolha seus favoritos, personalize os pratos especiais e monte seu pedido com toda a praticidade.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
          <span className="rounded-full border border-slate-700 px-3 py-2">Dinheiro</span>
          <span className="rounded-full border border-slate-700 px-3 py-2">Cartões</span>
          <span className="rounded-full border border-slate-700 px-3 py-2">Pix</span>
        </div>
      </div>
      <img
        loading="lazy"
        className="h-64 w-full rounded-3xl object-cover shadow-2xl shadow-black/30 lg:h-full"
        src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1280"
        alt="Garçom servindo uma salada fresca e aperitivos em um ambiente aconchegante de restaurante."
      />
    </section>
  );
}
