import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";

interface NewsSectionProps {
  isDark?: boolean;
}

export function NewsSection({ isDark = false }: NewsSectionProps) {
  const { t } = useI18n();
  const updates = [
    t("news.i1"),
    t("news.i2"),
    t("news.i3"),
  ];

  return (
    <section id="blog" className="px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-5xl font-bold ${
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
                  className={`text-lg ${
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
