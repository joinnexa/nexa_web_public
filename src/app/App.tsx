import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { TrustBar } from "./components/trust-bar";
import { WhatIsNexa } from "./components/what-is-nexa";
import { ServicesSection } from "./components/services-section";
import { DetailedServicesSection } from "./components/detailed-services-section";
import { WhyNexa } from "./components/why-nexa";
import { ExperienceSection } from "./components/experience-section";
import { VisionSection } from "./components/vision-section";
import { SecuritySection } from "./components/security-section";
import { InvestorSection } from "./components/investor-section";
import { CareersSection } from "./components/careers-section";
import { NewsSection } from "./components/news-section";
import { FinalCTA } from "./components/final-cta";
import { Footer } from "./components/footer";
import { I18nProvider } from "./i18n";

export default function App() {
  return (
    <I18nProvider>
      <PublicWebApp />
    </I18nProvider>
  );
}

function PublicWebApp() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("nexa-public-theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      return;
    }
    if (storedTheme === "light") {
      setIsDark(false);
      return;
    }
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("nexa-public-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-[#081122] via-[#0E1D42] to-[#081122]"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
      <HeroSection isDark={isDark} />
      <TrustBar isDark={isDark} />
      <WhatIsNexa isDark={isDark} />
      <ServicesSection isDark={isDark} />
      <DetailedServicesSection isDark={isDark} />
      <WhyNexa isDark={isDark} />
      <ExperienceSection isDark={isDark} />
      <VisionSection isDark={isDark} />
      <SecuritySection isDark={isDark} />
      <InvestorSection isDark={isDark} />
      <CareersSection isDark={isDark} />
      <NewsSection isDark={isDark} />
      <FinalCTA isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}
