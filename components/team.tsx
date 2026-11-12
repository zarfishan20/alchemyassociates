const commitments = [
  {
    number: "01",
    title: "Clear explanations",
    description:
      "Understand your accounts, tax responsibilities and next steps without unnecessary jargon.",
  },
  {
    number: "02",
    title: "Practical support",
    description:
      "Get help with the day-to-day accounting, tax, VAT and payroll tasks that keep your finances organised.",
  },
  {
    number: "03",
    title: "A local point of contact",
    description:
      "Speak to an accountancy practice based at 4 Wangey Road, Chadwell Heath, serving individuals and businesses.",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="approach-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-subheading">
            The Alchemy approach
          </p>
          <h2
            id="approach-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-brand-text md:text-5xl"
          >
            Accountancy that makes the next step clearer.
          </h2>
          <p className="mt-5 text-base leading-7 text-brand-text/70">
            Straightforward support for the financial and compliance work behind
            running a business or managing your personal tax affairs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {commitments.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-brand-primary/10 bg-brand-surface p-8"
            >
              <p className="text-sm font-bold tracking-widest text-brand-subheading">
                {item.number}
              </p>
              <h3 className="mt-5 text-xl font-bold text-brand-text">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-brand-text/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
