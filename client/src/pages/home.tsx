import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import OpportunitiesSection from "@/components/opportunities-section";
import ProcessSection from "@/components/process-section";
import CountriesSection from "@/components/countries-section";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-background font-sans antialiased">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <StatsSection />
        <OpportunitiesSection />
        <ProcessSection />
        <CountriesSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
