"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { useIsPhone } from "../../hooks/useIsPhone";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  isDark?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = "", isDark = false, delay = 0 }: GlassCardProps) {
  const isPhone = useIsPhone();
  const y = isPhone ? 10 : 20;
  const duration = isPhone ? 0.34 : 0.62;
  const delayScaled = delay * (isPhone ? 0.55 : 1);

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut", delay: delayScaled }}
      className={`
        rounded-3xl p-5 sm:p-8 backdrop-blur-xl
        ${isDark
          ? 'bg-white/5 border border-[#72AFF8]/20 shadow-[0_0_40px_rgba(114,175,248,0.1)]'
          : 'bg-white/60 border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
        }
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
