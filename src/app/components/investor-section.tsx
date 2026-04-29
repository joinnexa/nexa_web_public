import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { useI18n } from "../i18n";

interface InvestorSectionProps {
  isDark?: boolean;
}

export function InvestorSection({ isDark = false }: InvestorSectionProps) {
  const { t } = useI18n();
  return (
    <section id="investors" className="px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <GlassCard isDark={isDark}>
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-4xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t("investors.title")}
              </h2>
              <p
                className={`text-xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t("investors.p1")}
              </p>
              <p
                className={`text-xl leading-relaxed mt-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t("investors.p2")}
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <a
                href="mailto:partnerships@joinnexa.ma?subject=Partnership%20Inquiry"
                className={`
                  px-8 py-4 rounded-full font-semibold transition-all
                  ${isDark
                    ? 'bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white shadow-[0_0_30px_rgba(114,175,248,0.4)]'
                    : 'bg-gradient-to-r from-[#4D8EF6] to-[#2F73E8] text-white shadow-xl'
                  }
                `}
              >
                {t("investors.cta1")}
              </a>
              
              <a
                href="mailto:contact@joinnexa.ma?subject=Investor%20Relations%20Inquiry"
                className={`
                  px-8 py-4 rounded-full font-semibold transition-all
                  ${isDark
                    ? 'border-2 border-[#72AFF8]/30 text-white hover:bg-white/5'
                    : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {t("investors.cta2")}
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
