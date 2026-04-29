"use client";

import { motion } from "motion/react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface HeroSectionProps {
  isDark?: boolean;
}

export function HeroSection({ isDark = false }: HeroSectionProps) {
  const { t } = useI18n();
  const m = useScrollReveal();

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          {...m.fadeScale}
          className="space-y-4 sm:space-y-8"
        >
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
              isDark
                ? 'bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent'
            }`}
          >
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>

          <p
            className={`text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-6">
            <a
              href="#waitlist"
              className={`
                w-full sm:w-auto text-center px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all
                ${isDark
                  ? 'bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white shadow-[0_0_30px_rgba(114,175,248,0.5)] hover:shadow-[0_0_50px_rgba(114,175,248,0.7)]'
                  : 'bg-gradient-to-r from-[#4D8EF6] to-[#2F73E8] text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(47,115,232,0.4)]'
                }
              `}
            >
              {t("hero.ctaPrimary")}
            </a>

            <a
              href="#services"
              className={`
                w-full sm:w-auto text-center px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all
                ${isDark
                  ? 'border-2 border-[#72AFF8]/30 text-white hover:bg-white/5 hover:border-[#72AFF8]/50'
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p
            className={`text-sm pt-5 sm:pt-8 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {t("hero.note")}
          </p>
        </motion.div>

        {/* Decorative gradient orb */}
        <div className="relative mt-10 sm:mt-20">
          <div
            className={`
              w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto rounded-full blur-3xl max-sm:opacity-25 opacity-30
              ${isDark
                ? 'bg-gradient-to-r from-[#72AFF8] via-[#4D8EF6] to-[#F5D48C]'
                : 'bg-gradient-to-r from-[#4D8EF6] via-[#72AFF8] to-[#F5D48C]'
              }
            `}
          />
        </div>
      </div>
    </section>
  );
}
