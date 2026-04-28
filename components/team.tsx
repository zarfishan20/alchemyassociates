import Image from 'next/image';

const team = [
  {
    name: "Sarah Jenkins",
    role: "Lead Strategist",
    image: "/founder.jpg",
  },
  {
    name: "Marcus Chen",
    role: "Head of Product",
    image: "",
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    image: "",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-brand-surface">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-subheading">
            The Experts
          </span>
          <h2 className="mt-3 text-4xl font-bold text-brand-halfheading md:text-5xl">
            Meet our <span className="text-brand-primary">Team</span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-brand-button mx-auto rounded-full" />
        </div>

        {/* Team Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="group relative">
              {/* Image Container with Custom Accent Border */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-brand-accent">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Text Content */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-brand-text">
                  {member.name}
                </h3>
                <p className="font-medium text-brand-subheading">
                  {member.role}
                </p>
                
                {/* Social Placeholder Line */}
                <div className="mt-4 flex justify-center gap-4 text-brand-muted opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                   <div className="h-1 w-8 bg-brand-accent/30 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}