import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "motion/react";
import { Lightbulb, BookOpen, Shield, Phone, Search, Sun, Moon } from "lucide-react";
import { NexaLogo } from "./nexa-logo";
import { useI18n } from "../i18n";

interface HeaderProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function Header({ isDark = false, onToggleTheme }: HeaderProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const { scrollY } = useScroll();
  const { locale, setLocale, t } = useI18n();
  const desktopLocaleRef = useRef<HTMLDivElement | null>(null);
  const mobileLocaleRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { label: t("nav.about"), icon: Lightbulb, target: "about", offset: -20 },
    { label: t("nav.overview"), icon: Search, target: "services", offset: -50 },
    { label: t("nav.howItWorks"), icon: BookOpen, target: "investors", offset: -50 },
    { label: t("nav.trust"), icon: Shield, target: "blog", offset: -50 },
    { label: t("nav.contact"), icon: Phone, target: "waitlist", offset: -20 },
  ];

  const handleScroll = (target: string, offset: number = -80) => {
    const element = document.getElementById(target);
    if (!element) {
      return;
    }
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleJoinWaitlist = () => {
    handleScroll("waitlist", 30);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const inDesktop = desktopLocaleRef.current?.contains(target);
      const inMobile = mobileLocaleRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setIsLocaleOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocaleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const progress = useTransform(scrollY, [0, 260], [0, 1], { clamp: true });
  const glassDelayed = useTransform(progress, (v) => Math.max(v - 0.1, 0) / 0.9);
  const glassEased = useTransform(glassDelayed, (v) => 1 - Math.pow(1 - v, 2));
  const glass = useSpring(glassEased, { stiffness: 120, damping: 24, mass: 0.9 });

  const shrinkDelayed = useTransform(progress, (v) => Math.max(v - 0.35, 0) / 0.65);
  const shrinkEased = useTransform(shrinkDelayed, (v) => 1 - Math.pow(1 - v, 2));
  const shrink = useSpring(shrinkEased, { stiffness: 120, damping: 24, mass: 0.9 });

  const maxWidth = useMotionValue("100%");

  useEffect(() => {
    const updateMaxWidth = () => {
      const shrinkValue = shrink.get();
      const endValue = isSmallScreen ? 85 : 75;
      const currentPercent = 100 + (endValue - 100) * shrinkValue;
      maxWidth.set(`${currentPercent}%`);
    };

    const unsubscribe = shrink.on("change", updateMaxWidth);
    updateMaxWidth();
    return () => unsubscribe();
  }, [shrink, isSmallScreen, maxWidth]);

  const paddingX = useTransform(glass, [0, 1], ["0rem", "1rem"]);
  const bgColor = useTransform(
    glass,
    [0, 1],
    isDark
      ? ["rgba(8,17,34,0.90)", "rgba(8,17,34,0.64)"]
      : ["rgba(255,255,255,0.96)", "rgba(255,255,255,0.64)"],
  );
  const borderColor = useTransform(
    glass,
    [0, 1],
    isDark ? ["rgba(255,255,255,0.18)", "rgba(255,255,255,0.30)"] : ["rgba(255,255,255,0.28)", "rgba(255,255,255,0.60)"],
  );
  const boxShadow = useTransform(
    glass,
    [0, 1],
    isDark
      ? ["0 2px 8px rgba(0,0,0,0.20)", "0 16px 45px rgba(0,0,0,0.35)"]
      : ["0 2px 8px rgba(0,0,0,0.04)", "0 16px 45px rgba(0,0,0,0.12)"],
  );
  const blur = useTransform(glass, [0, 1], ["blur(3px)", "blur(15px)"]);
  const radius = useTransform(glass, [0, 1], ["2px", "16px"]);
  const translateY = useTransform(glass, [0, 1], ["0px", "6px"]);
  const scale = useTransform(glass, [0, 1], ["1", "0.98"]);
  const transform = useTransform(glass, () => `translateY(${translateY.get()}) scale(${scale.get()})`);

  return (
    <>
      <div className="hidden md:block h-16" />
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 pt-2">
        <motion.div
          className="w-full"
          style={{
            maxWidth,
            paddingInline: paddingX,
            margin: "0 auto",
          }}
        >
          <motion.div
            className="border"
            style={{
              backgroundColor: bgColor,
              borderColor,
              boxShadow,
              backdropFilter: blur,
              borderRadius: radius,
              transform,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 24,
              mass: 0.9,
            }}
          >
            <div className="flex justify-between items-center h-12 px-4 sm:px-6 md:px-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <NexaLogo isDark={isDark} showText={false} />
              </button>

              <div className="flex items-center gap-6">
                {navItems.map(({ label, target, offset }) => (
                  <button
                    key={target}
                    onClick={() => handleScroll(target, offset)}
                    className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors ${
                      isDark ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                ))}
                <div className="relative" ref={desktopLocaleRef}>
                  <button
                    onClick={() => setIsLocaleOpen((prev) => !prev)}
                    className={`font-semibold py-2 px-2 md:px-3 rounded-lg transition-all text-xs border min-w-14 ${
                      isDark
                        ? "border-white/20 text-white hover:bg-white/10"
                        : "border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label="Change language"
                    aria-haspopup="listbox"
                    aria-expanded={isLocaleOpen}
                  >
                    {locale.toUpperCase()}
                  </button>
                  {isLocaleOpen && (
                    <div
                      className={`absolute right-0 top-full mt-2 rounded-xl border shadow-lg p-1.5 z-50 min-w-20 ${
                        isDark ? "border-white/15 bg-[#0b1a35]" : "border-gray-200 bg-white"
                      }`}
                      role="listbox"
                      aria-label="Select language"
                    >
                      {(["en", "fr", "ar"] as Locale[]).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setLocale(item);
                            setIsLocaleOpen(false);
                          }}
                          className={`w-full h-8 rounded-lg text-xs font-semibold ${
                            item === locale
                              ? "bg-blue-600 text-white"
                              : isDark
                                ? "text-gray-100 hover:bg-white/10"
                                : "text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {item.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={onToggleTheme}
                  aria-label="Toggle color theme"
                  className={`font-semibold py-2 px-2 md:px-3 rounded-lg transition-all text-xs border ${
                    isDark
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </button>
                <button
                  onClick={handleJoinWaitlist}
                  className={`font-semibold py-2 px-2 md:px-4 rounded-lg transition-all text-xs ${
                    isDark
                      ? "bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white"
                      : "bg-[#0f172a] text-white"
                  }`}
                >
                  {t("nav.joinWaitlist")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </nav>

      <div className="md:hidden h-[104px]" />
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 h-14 px-4 border-b backdrop-blur-md flex items-center justify-between ${
          isDark ? "bg-[#081122]/80 border-white/10 text-white" : "bg-white/80 border-gray-200 text-gray-900"
        }`}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <NexaLogo isDark={isDark} showText={false} />
        </button>
        <div className="relative" ref={mobileLocaleRef}>
          <button
            onClick={() => setIsLocaleOpen((prev) => !prev)}
            className={`
              px-2 py-1.5 rounded-md text-xs font-medium border transition-all min-w-12
              ${isDark ? "border-white/20 text-white" : "border-gray-300 text-gray-700"}
            `}
            aria-label="Change language"
            aria-haspopup="listbox"
            aria-expanded={isLocaleOpen}
          >
            {locale.toUpperCase()}
          </button>
          {isLocaleOpen && (
            <div
              className={`absolute right-0 top-full mt-2 rounded-xl border shadow-lg p-1.5 z-50 min-w-20 ${
                isDark ? "border-white/15 bg-[#0b1a35]" : "border-gray-200 bg-white"
              }`}
              role="listbox"
              aria-label="Select language"
            >
              {(["en", "fr", "ar"] as Locale[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setLocale(item);
                    setIsLocaleOpen(false);
                  }}
                  className={`w-full h-8 rounded-lg text-xs font-semibold ${
                    item === locale
                      ? "bg-blue-600 text-white"
                      : isDark
                        ? "text-gray-100 hover:bg-white/10"
                        : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium border transition-all
            ${isDark ? "border-white/20 text-white" : "border-gray-300 text-gray-700"}
          `}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </nav>
      <div
        className={`md:hidden fixed top-14 left-0 right-0 z-40 h-[50px] px-2 border-b backdrop-blur-md flex items-center gap-2 overflow-x-auto ${
          isDark ? "bg-[#081122]/80 border-white/10 text-white" : "bg-white/85 border-gray-200 text-gray-900"
        }`}
      >
        {navItems.map(({ label, target, offset }) => (
          <button
            key={`mobile-${target}`}
            onClick={() => handleScroll(target, offset)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
              isDark ? "border-white/15 text-gray-200" : "border-gray-200 text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={handleJoinWaitlist}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${
            isDark ? "bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white" : "bg-[#0f172a] text-white"
          }`}
        >
          {t("nav.joinWaitlist")}
        </button>
      </div>
    </>
  );
}
