import { ReactNode } from "react";

interface SplitThemeSectionProps {
  children: (isDark: boolean) => ReactNode;
  className?: string;
}

export function SplitThemeSection({ children, className = "" }: SplitThemeSectionProps) {
  return (
    <div className={`grid grid-cols-2 ${className}`}>
      {/* Light Mode - Left Side */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {children(false)}
      </div>
      
      {/* Dark Mode - Right Side */}
      <div className="bg-gradient-to-br from-[#081122] via-[#0E1D42] to-[#081122]">
        {children(true)}
      </div>
    </div>
  );
}
