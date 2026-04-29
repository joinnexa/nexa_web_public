import { motion } from "motion/react";
import { GlassCard } from "./glass-card";
import { ShieldCheck, UserCheck, Lock, Server } from "lucide-react";
import { useI18n } from "../i18n";

interface SecuritySectionProps {
  isDark?: boolean;
}

export function SecuritySection({ isDark = false }: SecuritySectionProps) {
  const { t } = useI18n();
  const features = [
    { icon: ShieldCheck, text: t("security.f1") },
    { icon: UserCheck, text: t("security.f2") },
    { icon: Lock, text: t("security.f3") },
    { icon: Server, text: t("security.f4") },
  ];

  return (
    <section className="px-12 py-24">
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
            {t("security.title")}
          </h2>
          <p
            className={`text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t("security.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.text} isDark={isDark} delay={index * 0.1}>
              <div className="flex items-center gap-4">
                <feature.icon
                  className={`w-8 h-8 ${
                    isDark ? 'text-[#72AFF8]' : 'text-[#4D8EF6]'
                  }`}
                />
                <span
                  className={`text-lg ${
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
