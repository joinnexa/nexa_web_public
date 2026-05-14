"use client";

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useI18n } from "../i18n";

interface FinalCTAProps {
  isDark?: boolean;
}

const moroccoCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
];
const cityLabels: Record<"en" | "fr" | "ar", Record<string, string>> = {
  en: {
    Casablanca: "Casablanca",
    Rabat: "Rabat",
    Marrakech: "Marrakech",
    Fes: "Fes",
    Tangier: "Tangier",
    Agadir: "Agadir",
    Meknes: "Meknes",
    Oujda: "Oujda",
    Kenitra: "Kenitra",
    Tetouan: "Tetouan",
  },
  fr: {
    Casablanca: "Casablanca",
    Rabat: "Rabat",
    Marrakech: "Marrakech",
    Fes: "Fes",
    Tangier: "Tanger",
    Agadir: "Agadir",
    Meknes: "Meknes",
    Oujda: "Oujda",
    Kenitra: "Kenitra",
    Tetouan: "Tetouan",
  },
  ar: {
    Casablanca: "الدار البيضاء",
    Rabat: "الرباط",
    Marrakech: "مراكش",
    Fes: "فاس",
    Tangier: "طنجة",
    Agadir: "أكادير",
    Meknes: "مكناس",
    Oujda: "وجدة",
    Kenitra: "القنيطرة",
    Tetouan: "تطوان",
  },
};

export function FinalCTA({ isDark = false }: FinalCTAProps) {
  const { t, locale } = useI18n();
  const isRtl = locale === "ar";
  const m = useScrollReveal();
  const ctaSegments = [t("final.form.userType.rider"), t("final.form.userType.driverCourier"), t("final.form.userType.merchantPartner")];
  const moroccoCityOptions = useMemo(
    () =>
      moroccoCities.map((city) => ({
        value: city,
        label: cityLabels[locale][city] ?? city,
      })),
    [locale],
  );
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    user_type: "",
    city: "",
    usage_note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${apiBaseUrl}/api/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          email: formData.email,
          city: formData.city,
          user_type: formData.user_type || undefined,
          how_will_use_nexa: formData.usage_note.trim() || undefined,
          source: "nexa_web_public",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message;
        throw new Error(
          typeof message === "string"
            ? message
            : Array.isArray(message)
              ? message.join(", ")
              : t("final.form.error"),
        );
      }

      setSubmitStatus({ type: "success", message: t("final.form.success") });
      setFormData({
        full_name: "",
        phone_number: "",
        email: "",
        user_type: "",
        city: "",
        usage_note: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : t("final.form.error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className={`px-4 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-20 ${isDark ? "bg-[#050B18]" : "bg-[#f3f4f6]"}`}
    >
      <div className="mx-auto max-w-[980px] text-center">
        <motion.div {...m.fadeScale} className="space-y-4 sm:space-y-8">
          <div className="relative mx-auto overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(160deg,#0A1224_0%,#050B18_58%,#08152b_100%)] px-4 py-8 shadow-[0_30px_80px_rgba(5,11,24,0.4)] sm:px-8 sm:py-10 lg:px-10">
            <div className="pointer-events-none absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.46)_0%,rgba(59,130,246,0.22)_40%,rgba(59,130,246,0)_74%)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.3)_0%,rgba(37,99,235,0)_74%)] blur-2xl" />
            <div className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_65%_20%,rgba(59,130,246,0.09),transparent_32%),radial-gradient(circle_at_24%_82%,rgba(37,99,235,0.08),transparent_34%)]" />
            <p className="relative text-center text-[11px] font-extrabold tracking-[0.28em] text-[#cbd5e1]">LAUNCHING SOON</p>
          <h2
            className="relative mt-4 text-center text-3xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[58px]"
          >
            {t("final.title")}
          </h2>

          <p className="relative mx-auto mt-3 max-w-2xl text-center text-base text-[#94A3B8] sm:text-lg md:text-xl">
            {t("final.subtitle")}
          </p>
          <div className="relative mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
            {ctaSegments.map((segment) => (
              <span
                key={segment}
                className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-extrabold text-[#e9efff] transition-all hover:border-[#3B82F6]/80 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] sm:px-4 sm:text-sm"
              >
                {segment}
              </span>
            ))}
          </div>
          {submitStatus && (
            <div
              className={`mx-auto mt-5 max-w-2xl rounded-xl border px-4 py-3 text-sm sm:text-base ${
                submitStatus.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            dir={isRtl ? "rtl" : "ltr"}
            className={`relative mx-auto grid w-full max-w-2xl gap-5 pt-5 sm:gap-5 sm:pt-8 ${isRtl ? "text-right" : "text-left"}`}
          >
            <label className={`text-sm font-semibold text-[#e8f0ff] sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
              {t("final.form.fullName")} <span className="text-red-500">*</span>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder={t("final.form.fullNamePlaceholder")}
                required
                autoComplete="name"
                className={`mt-2 h-14 w-full rounded-2xl border px-4 text-base text-white placeholder:text-[#94A3B8] outline-none transition-all ${isRtl ? "text-right placeholder:text-right" : ""} ${
                  isDark
                    ? "border-white/15 bg-[#07111f] focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.24)]"
                    : "border-[#1e293b] bg-[#07111f] focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.24)]"
                }`}
              />
            </label>

            <label className={`text-sm font-semibold text-[#e8f0ff] sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
              {t("final.form.phone")} <span className="text-red-500">*</span>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder={t("final.form.phonePlaceholder")}
                required
                autoComplete="tel"
                className={`mt-2 h-14 w-full rounded-2xl border px-4 text-base text-white placeholder:text-[#94A3B8] outline-none transition-all ${isRtl ? "text-right placeholder:text-right" : ""} ${
                  isDark
                    ? "border-white/15 bg-[rgba(7,11,20,0.8)] focus:border-[#72AFF8] focus:shadow-[0_0_0_3px_rgba(114,175,248,0.25)]"
                    : "border-gray-300 bg-[rgba(17,24,39,0.9)] focus:border-[#4D8EF6] focus:shadow-[0_0_0_3px_rgba(77,142,246,0.25)]"
                }`}
              />
            </label>

            <label className={`text-sm font-semibold text-[#e8f0ff] sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
              {t("final.form.email")} <span className="text-red-500">*</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("final.form.emailPlaceholder")}
                required
                autoComplete="email"
                className={`mt-2 h-14 w-full rounded-2xl border px-4 text-base text-white placeholder:text-[#94A3B8] outline-none transition-all ${isRtl ? "text-right placeholder:text-right" : ""} ${
                  isDark
                    ? "border-white/15 bg-[rgba(7,11,20,0.8)] focus:border-[#72AFF8] focus:shadow-[0_0_0_3px_rgba(114,175,248,0.25)]"
                    : "border-gray-300 bg-[rgba(17,24,39,0.9)] focus:border-[#4D8EF6] focus:shadow-[0_0_0_3px_rgba(77,142,246,0.25)]"
                }`}
              />
            </label>

            <label className={`text-sm font-semibold text-[#e8f0ff] sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
              {t("final.form.userType")} <span className="text-red-500">*</span>
              <div className="mt-2">
                <WaitlistDropdown
                  value={formData.user_type}
                  options={[
                    { value: "investor", label: t("final.form.userType.investor") },
                    { value: "rider", label: t("final.form.userType.rider") },
                    { value: "driver_courier", label: t("final.form.userType.driverCourier") },
                    { value: "merchant_partner", label: t("final.form.userType.merchantPartner") },
                  ]}
                  placeholder={t("final.form.userTypePlaceholder")}
                  ariaLabel={t("final.form.userType")}
                  isRtl={isRtl}
                  onChange={(value) => setFormData((prev) => ({ ...prev, user_type: value }))}
                />
                <input type="hidden" name="user_type" value={formData.user_type} required />
              </div>
            </label>

            <label className={`text-sm font-semibold text-[#e8f0ff] sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
              {t("final.form.city")} <span className="text-red-500">*</span>
              <div className="mt-2">
                <WaitlistDropdown
                  value={formData.city}
                  options={moroccoCityOptions}
                  placeholder={t("final.form.cityPlaceholder")}
                  ariaLabel={t("final.form.city")}
                  isRtl={isRtl}
                  onChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                />
                <input type="hidden" name="city" value={formData.city} required />
              </div>
            </label>

            <label className={`text-sm font-semibold text-[#e8f0ff] sm:text-base ${isRtl ? "text-right" : "text-left"}`}>
              {t("final.form.usage")}
              <textarea
                name="usage_note"
                value={formData.usage_note}
                onChange={handleInputChange}
                placeholder={t("final.form.usagePlaceholder")}
                className={`mt-2 min-h-[118px] w-full rounded-2xl border px-4 py-3 text-base text-white placeholder:text-[#94A3B8] outline-none transition-all ${isRtl ? "text-right placeholder:text-right" : ""} ${
                  isDark
                    ? "border-white/15 bg-[rgba(7,11,20,0.8)] focus:border-[#72AFF8] focus:shadow-[0_0_0_3px_rgba(114,175,248,0.25)]"
                    : "border-gray-300 bg-[rgba(17,24,39,0.9)] focus:border-[#4D8EF6] focus:shadow-[0_0_0_3px_rgba(77,142,246,0.25)]"
                }`}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-1 h-[58px] w-full rounded-full px-6 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg ${
                isDark
                  ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  : "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.45)]"
              }`}
            >
              {isSubmitting ? t("final.form.submitting") : t("final.form.submit")}
            </button>

            <p className="text-center text-sm text-[#c9d3e4]">
              {t("final.form.privacy")}
            </p>
          </form>
          </div>
        </motion.div>

        {/* Decorative gradient orb */}
        <div className="relative mt-10 sm:mt-20">
          <div
            className={`
              w-[200px] h-[200px] sm:w-[360px] sm:h-[360px] lg:w-[500px] lg:h-[500px] mx-auto rounded-full blur-[100px] max-sm:opacity-35 opacity-40
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

function WaitlistDropdown({
  value,
  options,
  placeholder,
  ariaLabel,
  isRtl = false,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  placeholder: string;
  ariaLabel: string;
  isRtl?: boolean;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selected = options.find((option) => option.value === value);
  const triggerText = selected?.label ?? placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        dir={isRtl ? "rtl" : "ltr"}
        className={`relative h-14 w-full rounded-2xl border border-[#1e293b] bg-[#07111f] px-4 text-base font-semibold text-white outline-none transition-all focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.24)] ${isRtl ? "pl-10 pr-4 text-right" : "pr-10 text-left"}`}
      >
        <span className={selected ? "text-white" : "text-[#94A3B8]"}>{triggerText}</span>
        <span className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#94A3B8] ${isRtl ? "left-4" : "right-4"}`}>⌄</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-30 mt-2 grid max-h-56 w-full gap-1 overflow-y-auto rounded-2xl border border-[#1e293b] bg-[#0b1220] p-2 shadow-2xl [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.75)_rgba(10,18,36,0.55)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[rgba(10,18,36,0.55)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(148,163,184,0.75)] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(148,163,184,0.9)]"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`min-h-10 rounded-lg px-3 ${isRtl ? "text-right" : "text-left"} text-base font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
