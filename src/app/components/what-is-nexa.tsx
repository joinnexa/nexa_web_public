import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { useI18n } from "../i18n";

interface WhatIsNexaProps {
  isDark?: boolean;
}

export function WhatIsNexa({ isDark = false }: WhatIsNexaProps) {
  const { t } = useI18n();
  return (
    <section id="about" className="px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("about.title")}
          </h2>
        </motion.div>

        <GlassCard isDark={isDark}>
          <div className="space-y-6">
            <p
              className={`text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {t("about.p1")}
            </p>
            
            <p
              className={`text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t("about.p2")}
            </p>
            
            <p
              className={`text-xl font-semibold pt-4 ${
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
