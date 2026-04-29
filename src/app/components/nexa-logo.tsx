import nexaLogoBlack from "../../assets/nexa-black.png";
import nexaLogoWhite from "../../assets/nexa-white.png";

interface NexaLogoProps {
  isDark?: boolean;
  showText?: boolean;
}

export function NexaLogo({ isDark = false, showText = true }: NexaLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={isDark ? nexaLogoWhite : nexaLogoBlack}
        alt="Nexa logo"
        className="w-8 h-8 object-contain"
      />
      {showText ? <span className="text-xl font-semibold tracking-tight">Nexa</span> : null}
    </div>
  );
}
