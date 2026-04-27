export default function TrustBar() {
  return (
    <section className="border-y border-brand-navy/5 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-brand-slate uppercase tracking-[0.2em] mb-10">
          Certified Expert in Modern Financial Tools
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          
          <span className="text-2xl font-light tracking-widest uppercase text-nowrap">Xero</span>
          <span className="text-2xl font-black italic text-nowrap">money<span className="text-brand-gold">soft</span></span>
          <span className="text-2xl font-semibold tracking-tight text-nowrap">BRIGHTPAY</span>
        </div>
      </div>
    </section>
  );
}