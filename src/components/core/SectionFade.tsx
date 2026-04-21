import { cn } from "@/lib/utils";

export interface SectionFadeProps {
  /** Keep vertical height of the fade. Can be any valid CSS length (e.g., '100px', '10rem'). Default: '100px' */
  height?: string;
  /** Position of the fade relative to its containing block. Default: 'bottom' */
  position?: "top" | "bottom";
  /** The starting solid color of the fade. Should be a valid tailwind/CSS color value that matches the section background. Default: 'hsl(var(--background))' */
  color?: string;
  /** Optional additional class names */
  className?: string;
}

export function SectionFade({
  height = "100px",
  position = "bottom",
  color = "hsl(var(--background))",
  className,
}: SectionFadeProps) {
  // Using an inline style for the background image is the most reliable way 
  // to dynamically generate the gradient with a custom color property without
  // depending on tailwind arbitrary values that might not be generated at build time.
  const gradientStyle = {
    backgroundImage: `linear-gradient(to ${
      position === "bottom" ? "top" : "bottom"
    }, ${color} 0%, transparent 100%)`,
    height,
  };

  return (
    <div
      className={cn(
        "absolute left-0 right-0 z-10 pointer-events-none",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={gradientStyle}
      aria-hidden="true"
    />
  );
}

export default SectionFade;
