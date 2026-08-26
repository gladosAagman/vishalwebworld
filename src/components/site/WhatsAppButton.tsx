import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { WhatsAppIcon } from "./WhatsAppIcon";

const sizeStyles = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  default: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2.5 px-5 text-base",
} as const;

const iconSizes = {
  sm: 16,
  default: 18,
  lg: 22,
} as const;

type WhatsAppButtonProps<T extends ElementType = "a"> = {
  as?: T;
  size?: keyof typeof sizeStyles;
  href?: string;
  /** Internal route — rendered with next/link for client-side navigation. */
  to?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "href" | "to" | "children">;

export function WhatsAppButton<T extends ElementType = "a">({
  as,
  size = "default",
  href,
  to,
  children,
  className = "",
  ...rest
}: WhatsAppButtonProps<T>) {
  let Component: ElementType = as || "a";
  const restProps = rest as Record<string, unknown>;
  if (to) {
    Component = Link as unknown as ElementType;
    restProps["href"] = to;
  } else if (href) {
    restProps["href"] = href;
    restProps["target"] = "_blank";
    restProps["rel"] = "noopener noreferrer";
  }

  return (
    <Component
      className={[
        "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200",
        "bg-[#25D366] text-white shadow-md hover:bg-[#128C7E] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        sizeStyles[size],
        className,
      ].join(" ")}
      {...restProps}
    >
      <WhatsAppIcon size={iconSizes[size]} />
      <span>{children}</span>
    </Component>
  );
}
