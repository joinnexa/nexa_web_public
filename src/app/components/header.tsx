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
import { cn } from "./ui/utils";

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

      <div className="md:hidden h-[114px]" aria-hidden />
      {/* Mobile: floating glass stack (aligned with Nexa Go / Nexa Pay) */}
      <div className="md:hidden fixed inset-x-0 top-0 z-50 bg-transparent px-3 pt-2 pb-2">
        <div className="mx-auto flex w-full max-w-full flex-col">
          <div
            className={cn(
              "relative z-20 grid h-[52px] shrink-0 grid-cols-3 items-center gap-1 px-3",
              "rounded-t-[18px] border border-b-0",
              "backdrop-blur-[14px] backdrop-saturate-150",
              "shadow-[0_20px_60px_rgba(20,31,52,0.08)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.34)]",
              isDark
                ? "border-white/10 bg-[rgba(17,26,42,0.78)] text-white"
                : "border-gray-200/80 bg-white/[0.86] text-gray-900",
            )}
          >
            <div className="flex min-w-0 justify-start">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center hover:opacity-85 transition-opacity"
              >
                <NexaLogo isDark={isDark} showText={false} />
              </button>
            </div>

            <div className="relative z-30 flex justify-center" ref={mobileLocaleRef}>
              <button
                type="button"
                onClick={() => setIsLocaleOpen((prev) => !prev)}
                className={cn(
                  "inline-flex min-h-[38px] min-w-[4.75rem] items-center justify-center rounded-full border px-3 text-xs font-extrabold tracking-wider transition-colors",
                  isDark
                    ? "border-white/18 bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-gray-300/90 bg-gradient-to-b from-white to-gray-50 text-gray-900 shadow-sm",
                )}
                aria-label="Change language"
                aria-haspopup="listbox"
                aria-expanded={isLocaleOpen}
              >
                {locale.toUpperCase()}
              </button>
              {isLocaleOpen && (
                <div
                  className={cn(
                    "absolute left-1/2 top-full z-[100] mt-1.5 min-w-24 -translate-x-1/2 rounded-xl border p-1.5 shadow-xl backdrop-blur-xl",
                    isDark ? "border-white/15 bg-[rgba(17,26,42,0.95)]" : "border-gray-200 bg-white/95",
                  )}
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
                      className={cn(
                        "w-full rounded-lg py-2 text-sm font-semibold",
                        item === locale
                          ? "bg-blue-600 text-white"
                          : isDark
                            ? "text-gray-100 hover:bg-white/10"
                            : "text-gray-800 hover:bg-gray-100",
                      )}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle color theme"
                className={cn(
                  "inline-flex size-[38px] shrink-0 items-center justify-center rounded-full border transition-colors",
                  isDark ? "border-white/18 text-white hover:bg-white/10" : "border-gray-300 text-gray-800 hover:bg-gray-100",
                )}
              >
                {isDark ? <Sun className="size-[1.05rem]" /> : <Moon className="size-[1.05rem]" />}
              </button>
            </div>
          </div>

          <nav
            aria-label="Mobile sections"
            className={cn(
              "relative z-10 flex h-[46px] items-center gap-2 overflow-x-auto px-2.5",
              "rounded-b-[18px] border border-t",
              "backdrop-blur-[14px] backdrop-saturate-150",
              "shadow-[0_20px_60px_rgba(20,31,52,0.08)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.34)]",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              isDark
                ? "border-white/10 border-t-white/16 bg-[rgba(17,26,42,0.78)]"
                : "border-gray-200/80 border-t-gray-300/60 bg-white/[0.86]",
            )}
          >
            {navItems.map(({ label, target, offset }) => (
              <button
                key={`mobile-${target}`}
                type="button"
                onClick={() => handleScroll(target, offset)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-[0.72rem] font-extrabold transition-colors",
                  isDark
                    ? "text-[#c6d0df] hover:bg-amber-400/14 hover:text-white"
                    : "text-[#526078] hover:bg-amber-400/18 hover:text-gray-900",
                )}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleJoinWaitlist}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-[0.72rem] font-extrabold transition-opacity hover:opacity-95",
                isDark
                  ? "bg-gradient-to-r from-[#72AFF8] to-[#4D8EF6] text-white"
                  : "bg-[#0f172a] text-white",
              )}
            >
              {t("nav.joinWaitlist")}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
