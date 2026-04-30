"use client";

import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import { NexaLogo } from "./nexa-logo";
import { cn } from "./ui/utils";

interface FooterProps {
  isDark?: boolean;
}

const INSTAGRAM_LINKS: { href: string; labelKey: string }[] = [
  { href: "https://www.instagram.com/joinnexa/", labelKey: "footer.instagram.joinnexa" },
  { href: "https://www.instagram.com/nexago.ma/", labelKey: "footer.instagram.nexago" },
  { href: "https://www.instagram.com/nexapay.ma/", labelKey: "footer.instagram.nexapay" },
  { href: "https://www.instagram.com/nexastays.ma/", labelKey: "footer.instagram.nexastays" },
];

const CONTACT_EMAILS = [
  "contact@joinnexa.ma",
  "partnerships@joinnexa.ma",
  "support@joinnexa.ma",
] as const;

const QUICK_LINKS: { labelKey: string; target: string; offset: number }[] = [
  { labelKey: "nav.about", target: "about", offset: -20 },
  { labelKey: "nav.overview", target: "services", offset: -50 },
  { labelKey: "nav.howItWorks", target: "investors", offset: -50 },
  { labelKey: "footer.quickLink.careers", target: "careers", offset: -50 },
  { labelKey: "nav.trust", target: "blog", offset: -50 },
  { labelKey: "nav.joinWaitlist", target: "waitlist", offset: 30 },
];

export function Footer({ isDark = false }: FooterProps) {
  const { t, locale } = useI18n();
  const m = useScrollReveal();
  const isRtl = locale === "ar";
  const year = new Date().getFullYear();

  const muted = isDark ? "text-gray-400" : "text-gray-500";
  const mutedStrong = isDark ? "text-gray-300" : "text-gray-700";
  const heading = isDark ? "text-white" : "text-gray-900";
  const border = isDark ? "border-[#72AFF8]/10" : "border-gray-200";
  const disclaimerMuted = isDark ? "text-gray-500" : "text-gray-500";

  const scrollTo = (target: string, offset: number) => {
    const element = document.getElementById(target);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <footer
      id="footer-contact"
      className={`px-4 sm:px-6 lg:px-12 py-10 sm:py-14 border-t ${border} ${
        isDark ? "bg-black/20" : "bg-white/40"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div {...m.opacityOnly} className="flex flex-col gap-8 sm:gap-10">
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${isRtl ? "sm:flex-row-reverse" : ""}`}
          >
            <NexaLogo isDark={isDark} />
            <p className={`text-sm leading-relaxed max-w-xl ${mutedStrong}`}>{t("footer.subtitle")}</p>
          </div>

          <p
            className={`text-xs leading-relaxed max-w-3xl ${disclaimerMuted} ${isRtl ? "text-right" : "text-left"}`}
          >
            {t("footer.disclaimer")}
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${heading}`}>
                {t("footer.quickLinks")}
              </h3>
              <ul
                className={`mt-3 space-y-2 ${isRtl ? "text-right" : "text-left"} list-none p-0 m-0`}
              >
                {QUICK_LINKS.map(({ labelKey, target, offset }) => (
                  <li key={`${target}-${labelKey}`}>
                    <button
                      type="button"
                      onClick={() => scrollTo(target, offset)}
                      className={cn(
                        "text-sm transition-colors",
                        muted,
                        isDark ? "hover:text-white" : "hover:text-gray-900",
                      )}
                    >
                      {t(labelKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${heading}`}>
                {t("footer.contact")}
              </h3>
              <div className={`mt-3 flex flex-col gap-2 ${isRtl ? "items-end" : "items-start"}`}>
                {CONTACT_EMAILS.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className={`text-sm transition-colors ${mutedStrong} hover:underline`}
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${heading}`}>
                {t("footer.social")}
              </h3>
              <ul
                className={`mt-3 flex flex-wrap gap-x-5 gap-y-2 ${isRtl ? "justify-end" : "justify-start"} list-none p-0 m-0`}
              >
                {INSTAGRAM_LINKS.map(({ href, labelKey }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 text-sm transition-colors",
                        muted,
                        isDark ? "hover:text-white" : "hover:text-gray-900",
                      )}
                    >
                      <Instagram className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                      <span>{t(labelKey)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-8 border-t ${border} text-xs ${muted} ${
              isRtl ? "sm:flex-row-reverse text-right sm:text-left" : ""
            }`}
          >
            <p>{t("footer.secured")}</p>
            <p>
              © {year} Nexa — Morocco · {t("footer.rightsReserved")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
