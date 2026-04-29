"use client";

import { motion } from "motion/react";
import { Shield, Zap, Globe, TrendingUp } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface TrustBarProps {
  isDark?: boolean;
}

export function TrustBar({ isDark = false }: TrustBarProps) {
  const { t } = useI18n();
  const m = useScrollReveal();
  const features = [
    { icon: Shield, text: t("trust.f1") },
    { icon: Zap, text: t("trust.f2") },
    { icon: TrendingUp, text: t("trust.f3") },
    { icon: Globe, text: t("trust.f4") },
  ];

  return (
    <section className={`px-4 sm:px-6 lg:px-12 py-8 sm:py-14 border-y ${isDark ? 'border-[#72AFF8]/10' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          {...m.opacityOnly}
          className={`text-center text-xs sm:text-sm mb-6 sm:mb-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {t("trust.caption")}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: m.yDrift }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: m.fadeUp.transition.duration,
                delay: (index * m.staggerMs) / 1000,
              }}
              className="flex flex-col items-center text-center gap-2 sm:gap-3"
            >
              <feature.icon
                className={`w-6 h-6 ${isDark ? 'text-[#72AFF8]' : 'text-[#4D8EF6]'}`}
              />
              <span className={`text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
