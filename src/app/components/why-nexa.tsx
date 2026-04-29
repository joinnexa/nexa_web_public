import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { useI18n } from "../i18n";

interface WhyNexaProps {
  isDark?: boolean;
}

export function WhyNexa({ isDark = false }: WhyNexaProps) {
  const { t } = useI18n();
  const benefits = [
    {
      title: t("why.b1t"),
      description: t("why.b1d"),
    },
    {
      title: t("why.b2t"),
      description: t("why.b2d"),
    },
    {
      title: t("why.b3t"),
      description: t("why.b3d"),
    },
    {
      title: t("why.b4t"),
      description: t("why.b4d"),
    },
    {
      title: t("why.b5t"),
      description: t("why.b5d"),
    },
    {
      title: t("why.b6t"),
      description: t("why.b6d"),
    },
  ];

  return (
    <section className="px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t("why.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <GlassCard key={benefit.title} isDark={isDark} delay={index * 0.08}>
              <div className="space-y-3">
                <h3
                  className={`text-xl font-semibold ${
                    isDark
                      ? 'bg-gradient-to-r from-[#72AFF8] to-white bg-clip-text text-transparent'
                      : 'text-gray-900'
                  }`}
                >
                  {benefit.title}
                </h3>
                <p
                  className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {benefit.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
