"use client";

import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface WhatIsNexaProps {
  isDark?: boolean;
}

export function WhatIsNexa({ isDark = false }: WhatIsNexaProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...m.fadeUp}
          className="text-center mb-8 sm:mb-14"
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("about.title")}
          </h2>
        </motion.div>

        <GlassCard isDark={isDark}>
          <div className="space-y-4 sm:space-y-6">
            <p
              className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {t("about.p1")}
            </p>
            
            <p
              className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t("about.p2")}
            </p>
            
            <p
              className={`text-lg sm:text-xl font-semibold pt-2 sm:pt-4 ${
                isDark
                  ? 'bg-gradient-to-r from-[#72AFF8] to-[#F5D48C] bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#4D8EF6] to-[#2F73E8] bg-clip-text text-transparent'
              }`}
            >
              {t("about.p3")}
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
