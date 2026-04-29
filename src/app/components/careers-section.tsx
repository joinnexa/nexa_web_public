"use client";

import { motion } from "motion/react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface CareersSectionProps {
  isDark?: boolean;
}

export function CareersSection({ isDark = false }: CareersSectionProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  return (
    <section id="careers" className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          {...m.fadeUp}
          className="space-y-5 sm:space-y-8"
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("careers.title")}
          </h2>

          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("careers.p1")}
          </p>

          <div className="pt-6">
            <a
              href="mailto:contact@joinnexa.ma?subject=Careers%20at%20Nexa"
              className={`
                inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all
                ${isDark
                  ? 'bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white shadow-[0_0_30px_rgba(114,175,248,0.4)]'
                  : 'bg-gradient-to-r from-[#4D8EF6] to-[#2F73E8] text-white shadow-xl'
                }
              `}
            >
              {t("careers.cta")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
