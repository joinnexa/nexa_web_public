"use client";

import { motion } from "motion/react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface VisionSectionProps {
  isDark?: boolean;
}

export function VisionSection({ isDark = false }: VisionSectionProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
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
            {t("vision.title")}
          </h2>

          <div className="space-y-3 sm:space-y-6 pt-3 sm:pt-8">
            <p
              className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {t("vision.p1")}
            </p>
            
            <p
              className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t("vision.p2")}
            </p>
          </div>

          {/* Decorative element */}
          <div className="pt-12">
            <div
              className={`
                h-1 w-32 mx-auto rounded-full
                ${isDark
                  ? 'bg-gradient-to-r from-transparent via-[#72AFF8] to-transparent'
                  : 'bg-gradient-to-r from-transparent via-[#4D8EF6] to-transparent'
                }
              `}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
