import { motion } from "motion/react";
import { useI18n } from "../i18n";

interface HeroSectionProps {
  isDark?: boolean;
}

export function HeroSection({ isDark = false }: HeroSectionProps) {
  const { t } = useI18n();
  return (
    <section className="px-12 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1
            className={`text-6xl md:text-7xl font-bold leading-tight ${
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
            className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center justify-center gap-4 pt-6">
            <a
              href="#waitlist"
              className={`
                px-8 py-4 rounded-full font-semibold text-lg transition-all
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
                px-8 py-4 rounded-full font-semibold text-lg transition-all
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
            className={`text-sm pt-8 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {t("hero.note")}
          </p>
        </motion.div>

        {/* Decorative gradient orb */}
        <div className="relative mt-20">
          <div
            className={`
              w-96 h-96 mx-auto rounded-full blur-3xl opacity-30
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
