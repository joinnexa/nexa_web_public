import { motion } from "motion/react";
import { Shield, Zap, Globe, TrendingUp } from "lucide-react";
import { useI18n } from "../i18n";

interface TrustBarProps {
  isDark?: boolean;
}

export function TrustBar({ isDark = false }: TrustBarProps) {
  const { t } = useI18n();
  const features = [
    { icon: Shield, text: t("trust.f1") },
    { icon: Zap, text: t("trust.f2") },
    { icon: TrendingUp, text: t("trust.f3") },
    { icon: Globe, text: t("trust.f4") },
  ];

  return (
    <section className={`px-12 py-16 border-y ${isDark ? 'border-[#72AFF8]/10' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-center text-sm mb-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {t("trust.caption")}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <feature.icon
                className={`w-6 h-6 ${isDark ? 'text-[#72AFF8]' : 'text-[#4D8EF6]'}`}
              />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
