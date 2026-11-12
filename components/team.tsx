const teamMembers = [
  {
    initials: "SS",
    name: "Shahid Shah",
    role: "Founder",
    bio: "Helping individuals and UK businesses make clearer, more confident decisions about their finances.",
    featured: true,
  },
  {
    initials: "TM",
    name: "Team Member 02",
    role: "Accounts & Client Support",
    bio: "Placeholder profile — replace with this team member’s introduction, experience and areas of expertise.",
    featured: false,
  },
  {
    initials: "TM",
    name: "Team Member 03",
    role: "Tax & Payroll Support",
    bio: "Placeholder profile — replace with this team member’s introduction, experience and areas of expertise.",
    featured: false,
  },
];

export default function TeamSection() {
  return (
    <section
      className="bg-white py-20 md:py-28"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-subheading">
            The people behind Alchemy
          </p>
          <h2
            id="team-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-brand-text md:text-5xl"
          >
            Meet the team.
          </h2>
          <p className="mt-5 text-base leading-7 text-brand-text/70">
            Approachable people, practical advice and personal support for
            every stage of your financial journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className={`group overflow-hidden rounded-2xl border bg-brand-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/10 ${
                member.featured
                  ? "border-brand-primary/30"
                  : "border-brand-primary/10"
              }`}
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-primary/15 via-brand-surface to-brand-subheading/15">
                <div className="absolute inset-x-8 bottom-0 h-2/3 rounded-t-full bg-brand-primary/5" />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-brand-primary text-3xl font-semibold tracking-wide text-white shadow-lg shadow-brand-primary/15">
                  {member.initials}
                </div>
                <span className="absolute bottom-4 left-4 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-text/60 backdrop-blur">
                  {member.featured ? "Leadership" : "Team"}
                </span>
              </div>

              <div className="p-7 md:p-8">
                <h3 className="text-xl font-bold text-brand-text">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-subheading">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-brand-text/70">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-brand-text/45">
          Team profiles are placeholders and will be updated with final
          biographies and photographs.
        </p>
      </div>
    </section>
  );
}
