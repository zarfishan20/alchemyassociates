import RequestAQuote from "@/components/RequestAQuote";

export const metadata = {
  title: "Request a Quote | FlexiPay Systems",
  description: "Get a personalized accounting and tax strategy quote today.",
};

export default function QuotePage() {
  return (
    // Cleaned up: bg-[var(--color-brand-surface)] -> bg-brand-surface
    <main className="min-h-screen bg-brand-surface py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Branding & Trust Content */}
        <div className="space-y-6">
          {/* Cleaned up: text-brand-text */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text tracking-tight leading-tight">
            Get a Tailored Quote for <span className="text-brand-primary">Your Business</span>
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
              <li key={i} className="flex items-center text-brand-text font-semibold">
                <svg className="w-5 h-5 text-brand-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-brand-muted/20">
            <p className="text-sm text-brand-muted italic leading-relaxed">
              &quot;FlexiPay transformed our payroll process. They are more than accountants; they are partners.&quot;
            </p>
            <p className="text-sm font-bold mt-2 text-brand-text">— Sarah J., CEO of TechFlow</p>
          </div>
        </div>

        {/* Right Side: The Form Component */}
        <div className="relative">
          {/* Cleaned up: bg-brand-primary/10 */}
          <div className="absolute -inset-4 bg-brand-primary/10 rounded-3xl blur-3xl -z-10" />
          
          <RequestAQuote />
        </div>

      </div>
    </main>
  );
}