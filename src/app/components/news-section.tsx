"use client";

import { motion } from "motion/react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GlassCard } from "./glass-card";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";

interface NewsSectionProps {
  isDark?: boolean;
}

export function NewsSection({ isDark = false }: NewsSectionProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  const updates = [
    t("news.i1"),
    t("news.i2"),
    t("news.i3"),
  ];

  return (
    <section id="blog" className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...m.fadeUp}
          className="text-center mb-8 sm:mb-14"
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("news.title")}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {updates.map((update, index) => (
            <GlassCard key={update} isDark={isDark} delay={index * 0.1}>
              <div className="flex items-center justify-between">
                <span
                  className={`text-base sm:text-lg ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  {update}
                </span>
                <ArrowRight
                  className={`w-5 h-5 ${
                    isDark ? 'text-[#72AFF8]' : 'text-[#4D8EF6]'
                  }`}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
