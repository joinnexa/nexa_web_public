import { motion } from "motion/react";
import { useI18n } from "../i18n";

interface FooterProps {
  isDark?: boolean;
}

export function Footer({ isDark = false }: FooterProps) {
  const { t } = useI18n();
  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.overview"), href: "#services" },
    { label: t("nav.howItWorks"), href: "#careers" },
    { label: t("nav.trust"), href: "#investors" },
    { label: "Blog", href: "#blog" },
    { label: t("footer.contact"), href: "mailto:contact@joinnexa.ma" },
  ];

  return (
    <footer className={`px-12 py-16 border-t ${isDark ? 'border-[#72AFF8]/10' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t("footer.rights")}
            </div>
            <div className={`text-sm flex flex-wrap items-center gap-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <a href="mailto:contact@joinnexa.ma" className="hover:underline">
                contact@joinnexa.ma
              </a>
              <span className={isDark ? "text-gray-500" : "text-gray-400"}>•</span>
              <a href="mailto:partnerships@joinnexa.ma" className="hover:underline">
                partnerships@joinnexa.ma
              </a>
              <span className={isDark ? "text-gray-500" : "text-gray-400"}>•</span>
              <a href="mailto:support@joinnexa.ma" className="hover:underline">
                support@joinnexa.ma
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
