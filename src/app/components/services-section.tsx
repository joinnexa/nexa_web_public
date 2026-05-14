"use client";

import React from "react";
import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import nexaPayLogo from "../../assets/nexa-pay.png";
import nexaGoLogo from "../../assets/nexa-go.png";
import nexaStaysLogo from "../../assets/nexa-stays.png";
import nexaMarketLogo from "../../assets/nexa-market.png";
import nexaFreshLogo from "../../assets/nexa-fresh.png";
import nexaJobsLogo from "../../assets/nexa-jobs.png";
import { useI18n } from "../i18n";

interface ServicesSectionProps {
  isDark?: boolean;
}

export function ServicesSection({ isDark = false }: ServicesSectionProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  interface ServiceItem {
    emoji?: string;
    logo?: string;
    logoClassName?: string;
    logoScaleClassName?: string;
    title: string;
    description: string;
    tagline: string;
    website?: string;
  }

  const services: ServiceItem[] = [
    {
      logo: nexaPayLogo,
      title: "Nexa Pay",
      description: t("services.pay.desc"),
      tagline: t("services.pay.tag"),
      website: "https://nexapay.ma",
    },
    {
      logo: nexaGoLogo,
      title: "Nexa Go",
      description: t("services.go.desc"),
      tagline: t("services.go.tag"),
      website: "https://nexago.ma",
    },
    {
      logo: nexaStaysLogo,
      title: "Nexa Stays",
      description: t("services.stays.desc"),
      tagline: t("services.stays.tag"),
      website: "https://nexastays.ma",
    },
    {
      logo: nexaMarketLogo,
      logoClassName: "h-32 w-32",
      logoScaleClassName: "scale-[1.5]",
      title: "Nexa Market",
      description: t("services.market.desc"),
      tagline: t("services.market.tag"),
    },
    {
      logo: nexaFreshLogo,
      logoClassName: "h-32 w-32",
      logoScaleClassName: "scale-[1.5]",
      title: "Nexa Fresh",
      description: t("services.fresh.desc"),
      tagline: t("services.fresh.tag"),
    },
    {
      logo: nexaJobsLogo,
      logoClassName: "h-32 w-32",
      logoScaleClassName: "scale-[1.5]",
      title: "Nexa Jobs",
      description: t("services.jobs.desc"),
      tagline: t("services.jobs.tag"),
    },
  ];

  return (
    <section id="services" className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          {...m.fadeUp}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("services.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 items-stretch">
          {services.map((service, index) => (
            <GlassCard
              key={service.title}
              isDark={isDark}
              delay={index * 0.1}
              className="h-full flex flex-col"
            >
              <div className="flex min-h-0 flex-1 flex-col gap-2.5 sm:gap-4">
                <div className="h-20 sm:h-28 md:h-32 flex items-center overflow-visible shrink-0">
                  {service.logo ? (
                    <img
                      src={service.logo}
                      alt={`${service.title} logo`}
                      className={`${service.logoClassName ?? "h-16 w-16 sm:h-20 sm:w-20"} ${service.logoScaleClassName ?? ""} object-contain origin-center`}
                    />
                  ) : (
                    <div className="text-5xl">{service.emoji}</div>
                  )}
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-semibold shrink-0 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`leading-relaxed shrink-0 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {service.description}
                </p>
                <div className="mt-auto flex flex-col gap-2 pt-2">
                  <p
                    className={`font-semibold text-sm ${
                      isDark ? 'text-[#72AFF8]' : 'text-[#4D8EF6]'
                    }`}
                  >
                    {service.tagline}
                  </p>
                  <div>
                    {service.website ? (
                      <a
                        href={service.website}
                        target="_blank"
                        rel="noreferrer"
                        className={`
                        inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${isDark
                          ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
                        }
                      `}
                      >
                        {t("services.visitWebsite")}
                      </a>
                    ) : (
                      <span
                        className={`
                        inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold
                        ${isDark ? "bg-white/5 text-gray-300 border border-white/10" : "bg-gray-50 text-gray-600 border border-gray-200"}
                      `}
                      >
                        {t("services.comingSoon")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
