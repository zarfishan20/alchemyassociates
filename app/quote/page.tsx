import RequestAQuote from "@/components/RequestAQuote";

export const metadata = {
  title: "Request a Quote | Alchemy Associates",
  description: "Get a personalized accounting and tax strategy quote today.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-surface text-text py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div className="space-y-6">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-logo tracking-tight leading-tight">
            Get a Tailored Quote for{" "}
            <span className="text-brand-halfheading ">Your Business</span>
          </h1>
          
          <p className="text-lg text-brand-muted leading-relaxed font-medium">
            Tell us a bit about your business or personal needs, and our team will 
            prepare a custom proposal within 24 hours. No hidden fees, just 
            transparent accounting.
          </p>
          
          <ul className="space-y-4">
            {[
              "Personalized Tax Optimization",
              "Expert Bookkeeping & Payroll",
              "IRS-Compliant Reporting",
              "Secure Data Handling"
            ].map((item, i) => (
              <li key={i} className="flex items-center text-brand-muted font-semibold">
                <svg
                  className="w-5 h-5 text-primary mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-muted/20">
            <p className="text-sm text-muted italic leading-relaxed">
              &quot;Alchemy transformed our payroll process. They are more than accountants; they are partners.&quot;
            </p>
            <p className="text-sm font-bold mt-2 text-text">
              — Sarah J., CEO of TechFlow
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10" />
          <RequestAQuote />
        </div>

      </div>
    </main>
  );
}