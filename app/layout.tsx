import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import AccountingChat from "@/components/AccountingChat";
import ClientWrapper from "../components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });
const production = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alchemyassociates.co.uk"),
  title: {
    default: "Alchemy Associates | Accountants in Chadwell Heath, Romford",
    template: "%s | Alchemy Associates",
  },
  description:
    "Accountancy, tax returns, VAT, bookkeeping and payroll support in Chadwell Heath, Romford. Speak to Alchemy Associates about your business or personal tax needs.",
  applicationName: "Alchemy Associates",
  category: "finance",
  alternates: {
    languages: {
      "en-GB": "https://www.alchemyassociates.co.uk/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.alchemyassociates.co.uk/",
    siteName: "Alchemy Associates",
    title: "Alchemy Associates | Accountants in Chadwell Heath, Romford",
    description:
      "Accountancy, tax returns, VAT, bookkeeping and payroll support in Chadwell Heath, Romford.",
  },
  twitter: {
    card: "summary",
    title: "Alchemy Associates | Accountants in Chadwell Heath, Romford",
    description:
      "Accountancy, tax returns, VAT, bookkeeping and payroll support in Chadwell Heath, Romford.",
  },
  robots: production
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Alchemy Associates",
  url: "https://www.alchemyassociates.co.uk/",
  image: "https://www.alchemyassociates.co.uk/logo.png",
  telephone: "+447828693818",
  email: "info@alchemyassociates.co.uk",
  description:
    "Accountancy, tax returns, VAT, bookkeeping and payroll support in Chadwell Heath, Romford.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Wangey Road",
    addressLocality: "Chadwell Heath",
    addressRegion: "London",
    postalCode: "RM6 4DD",
    addressCountry: "GB",
  },
  areaServed: [
    { "@type": "Place", name: "Chadwell Heath" },
    { "@type": "City", name: "Romford" },
    { "@type": "AdministrativeArea", name: "Greater London" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main>
          <ClientWrapper>{children}</ClientWrapper>
        </main>
        <Footer />
        <AccountingChat />
      </body>
    </html>
  );
}
