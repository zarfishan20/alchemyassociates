import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import AccountingChat from "@/components/AccountingChat";
import ClientWrapper from "../components/ClientWrapper";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlexiPay Systems | Automated UK Payroll & Finance",
  description:
    "Advanced financial systems and automated payroll for UK founders and business owners.",
  metadataBase: new URL("https://flexipaysystems.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body className={inter.className}>
        
        {/* Static header (NO animation wrapper) */}
        <Header />

        {/* ONLY animate page content */}
        <main>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </main>

        {/* Static footer (NO animation wrapper) */}
        <Footer />

        {/* Floating UI (outside animation system) */}
        <AccountingChat />

      </body>
    </html>
  );
}