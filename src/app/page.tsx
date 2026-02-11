"use client";

import Navbar from "@/components/Navbar";
import ScrollyHero from "@/components/ScrollyHero";
import HistorySection from "@/components/HistorySection";
import StatsSection from "@/components/StatsSection";
import PlansSection from "@/components/PlansSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import GlobalProgress from "@/components/GlobalProgress";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-[#050505] selection:bg-[#E3FF00] selection:text-black font-sans w-full">
      <Navbar />
      <GlobalProgress />
      <WhatsAppButton />

      {/* 1. Hero Section (Pinned Sequence) */}
      <ScrollyHero />

      {/* 2. Static Content Sections */}
      <div className="relative z-10 bg-[#050505] border-t border-white/5">
        <HistorySection />
        <StatsSection />
        <PlansSection />
        <TestimonialsSection />
        <LocationSection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
