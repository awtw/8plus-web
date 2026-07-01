import { cn } from "@/lib/utils";

type LogoVariant = "default" | "mono" | "light" | "favicon";

type LogoProps = {
  className?: string;
  size?: number;
  variant?: LogoVariant;
};

export function Logo({ className, size = 32, variant = "default" }: LogoProps) {
  const variants = {
    default: {
      background: "transparent",
      markFill: "var(--logo-mark)",
    },
    mono: {
      background: "transparent",
      markFill: "var(--logo-mark)",
    },
    light: {
      background: "transparent",
      markFill: "var(--logo-mark)",
    },
    favicon: {
      background: "var(--bg)",
      markFill: "var(--logo-mark)",
    },
  };

  const config = variants[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="8plus"
    >
      {config.background !== "transparent" ? (
        <rect width="100" height="100" rx="18" fill={config.background} />
      ) : null}
      <g fill={config.markFill}>
        <circle cx="32" cy="29" r="18" />
        <path d="M53 9H68L36 91H21L53 9Z" />
        <circle cx="70" cy="64" r="28" />
      </g>
    </svg>
  );
}
