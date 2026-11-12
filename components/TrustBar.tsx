export default function TrustBar() {
  return (
    <section
      aria-label="Accounting software"
      className="border-y border-brand-primary/10 bg-white py-10"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-subheading">
          Accounting and payroll software
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-brand-primary/70">
          <span className="text-2xl font-semibold tracking-tight">Xero</span>
          <span className="text-2xl font-bold tracking-tight">
            money<span className="text-brand-subheading">soft</span>
          </span>
          <span className="text-2xl font-bold tracking-tight">BrightPay</span>
        </div>
      </div>
    </section>
  );
}
