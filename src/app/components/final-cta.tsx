import { motion } from "motion/react";
import { useI18n } from "../i18n";

interface FinalCTAProps {
  isDark?: boolean;
}

export function FinalCTA({ isDark = false }: FinalCTAProps) {
  const { t } = useI18n();
  return (
    <section id="waitlist" className="px-12 py-32">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2
            className={`text-6xl font-bold leading-tight ${
              isDark
                ? 'bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent'
            }`}
          >
            {t("final.title")}
          </h2>

          <p
            className={`text-2xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("final.subtitle")}
          </p>

          <div className="flex items-center justify-center gap-4 pt-8">
            <a
              href="mailto:contact@joinnexa.ma?subject=Join%20Nexa%20Waitlist"
              className={`
                px-10 py-5 rounded-full font-semibold text-lg transition-all
                ${isDark
                  ? 'bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white shadow-[0_0_40px_rgba(114,175,248,0.6)]'
                  : 'bg-gradient-to-r from-[#4D8EF6] to-[#2F73E8] text-white shadow-2xl'
                }
              `}
            >
              {t("final.cta1")}
            </a>
            
            <a
              href="mailto:support@joinnexa.ma?subject=Nexa%20Support%20Request"
              className={`
                px-10 py-5 rounded-full font-semibold text-lg transition-all
                ${isDark
                  ? 'border-2 border-[#72AFF8]/30 text-white hover:bg-white/5'
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {t("final.cta2")}
            </a>
          </div>
        </motion.div>

        {/* Decorative gradient orb */}
        <div className="relative mt-24">
          <div
            className={`
              w-[500px] h-[500px] mx-auto rounded-full blur-[100px] opacity-40
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
