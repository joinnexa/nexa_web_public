"use client";

import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { ShieldCheck, UserCheck, Lock, Server } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface SecuritySectionProps {
  isDark?: boolean;
}

export function SecuritySection({ isDark = false }: SecuritySectionProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  const features = [
    { icon: ShieldCheck, text: t("security.f1") },
    { icon: UserCheck, text: t("security.f2") },
    { icon: Lock, text: t("security.f3") },
    { icon: Server, text: t("security.f4") },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
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
            {t("security.title")}
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("security.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.text} isDark={isDark} delay={index * 0.1}>
              <div className="flex items-center gap-3 sm:gap-4">
                <feature.icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    isDark ? 'text-[#72AFF8]' : 'text-[#4D8EF6]'
                  }`}
                />
                <span
                  className={`text-base sm:text-lg ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  {feature.text}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
