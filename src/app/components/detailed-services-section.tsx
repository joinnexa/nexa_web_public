import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { GlassCard } from "./glass-card";
import nexaPayLogo from "../../assets/nexa-pay.png";
import nexaGoLogo from "../../assets/nexa-go.png";
import nexaStaysLogo from "../../assets/nexa-stays.png";
import nexaMarketLogo from "../../assets/nexa-market.png";
import nexaFreshLogo from "../../assets/nexa-fresh.png";
import nexaJobsLogo from "../../assets/nexa-jobs.png";
import { useI18n } from "../i18n";

interface DetailedServicesSectionProps {
  isDark?: boolean;
}

interface ServiceDetail {
  title: string;
  headline: string;
  copy: string;
  highlights: string[];
  logo: string;
  website?: string;
}

export function DetailedServicesSection({ isDark = false }: DetailedServicesSectionProps) {
  const { t } = useI18n();
  const services: ServiceDetail[] = [
    {
      title: "Nexa Pay",
      headline: t("detailed.pay.headline"),
      copy: t("detailed.pay.copy"),
      highlights: [
        t("detailed.pay.h1"),
        t("detailed.pay.h2"),
        t("detailed.pay.h3"),
        t("detailed.pay.h4"),
      ],
      logo: nexaPayLogo,
      website: "https://nexapay.ma",
    },
    {
      title: "Nexa Go",
      headline: t("detailed.go.headline"),
      copy: t("detailed.go.copy"),
      highlights: [
        t("detailed.go.h1"),
        t("detailed.go.h2"),
        t("detailed.go.h3"),
        t("detailed.go.h4"),
      ],
      logo: nexaGoLogo,
      website: "https://nexago.ma",
    },
    {
      title: "Nexa Stays",
      headline: t("detailed.stays.headline"),
      copy: t("detailed.stays.copy"),
      highlights: [
        t("detailed.stays.h1"),
        t("detailed.stays.h2"),
        t("detailed.stays.h3"),
        t("detailed.stays.h4"),
      ],
      logo: nexaStaysLogo,
      website: "https://nexastays.ma",
    },
    {
      title: "Nexa Market",
      headline: t("detailed.market.headline"),
      copy: t("detailed.market.copy"),
      highlights: [
        t("detailed.market.h1"),
        t("detailed.market.h2"),
        t("detailed.market.h3"),
        t("detailed.market.h4"),
      ],
      logo: nexaMarketLogo,
    },
    {
      title: "Nexa Fresh",
      headline: t("detailed.fresh.headline"),
      copy: t("detailed.fresh.copy"),
      highlights: [
        t("detailed.fresh.h1"),
        t("detailed.fresh.h2"),
        t("detailed.fresh.h3"),
        t("detailed.fresh.h4"),
      ],
      logo: nexaFreshLogo,
    },
    {
      title: "Nexa Jobs",
      headline: t("detailed.jobs.headline"),
      copy: t("detailed.jobs.copy"),
      highlights: [
        t("detailed.jobs.h1"),
        t("detailed.jobs.h2"),
        t("detailed.jobs.h3"),
        t("detailed.jobs.h4"),
      ],
      logo: nexaJobsLogo,
    },
  ];

  return (
    <section id="detailed-services" className="px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {t("detailedServices.title")}
          </h2>
        </motion.div>

        <div className="space-y-8">
          {services.map((service, index) => {
            const reverse = index % 2 === 1;
            return (
              <GlassCard key={service.title} isDark={isDark} delay={index * 0.05}>
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div
                    className={`rounded-2xl p-8 flex items-center justify-center min-h-[260px] ${
                      isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"
                    }`}
                  >
                    <img src={service.logo} alt={`${service.title} logo`} className="h-36 w-36 object-contain" />
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className={`text-sm font-semibold tracking-wide uppercase ${isDark ? "text-[#72AFF8]" : "text-[#2F73E8]"}`}>
                        {service.title}
                      </p>
                      <h3 className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {service.headline}
                      </h3>
                    </div>

                    <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {service.copy}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-[#72AFF8]" : "text-[#2F73E8]"}`} />
                          <span className={isDark ? "text-gray-200" : "text-gray-700"}>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      {service.website ? (
                        <a
                          href={service.website}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            isDark
                              ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                              : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          {t("services.visitWebsite")}
                        </a>
                      ) : (
                        <span
                          className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold ${
                            isDark
                              ? "bg-white/5 text-gray-300 border border-white/10"
                              : "bg-gray-50 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {t("services.comingSoon")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
