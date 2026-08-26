import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import StarBorder from "@/components/StarBorder";

type Variant = "brand" | "primary" | "outline" | "ghost";
type Size = "default" | "sm" | "lg";

type StarButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  href?: string;
  to?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "variant" | "size" | "href" | "to" | "children">;


/** Border-glow colours track the logo ramp (see the palette note in globals.css). */
const variantStyles: Record<Variant, { color: string; inner: string }> = {
  brand: {
    color: "oklch(0.61 0.202 255)",
    inner:
      "bg-brand text-brand-foreground hover:bg-brand/90 shadow-[var(--shadow-lift)]",
  },
  primary: {
    color: "oklch(0.539 0.229 261)",
    inner:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-lift)]",
  },
  outline: {
    color: "oklch(0.539 0.229 261 / 0.7)",
    inner:
      "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 hover:border-primary/40",
  },
  ghost: {
    color: "oklch(0.5 0.03 262 / 0.5)",
    inner:
      "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  },
};

const sizePadding: Record<Size, string> = {
  default: "h-10 px-5",
  sm: "h-8 px-3 text-xs [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-12 px-7 text-base",
};

export function StarButton<T extends ElementType = "button">({
  as,
  variant = "brand",
  size = "default",
  href,
  to,
  children,
  className = "",
  ...rest
}: StarButtonProps<T>) {
  const { color, inner } = variantStyles[variant];

  let Component: ElementType = as || "button";
  const restProps = rest as Record<string, unknown>;
  if (to) {
    Component = Link as unknown as ElementType;
    restProps["href"] = to;
  } else if (href) {
    Component = "a";
    restProps["href"] = href;
    restProps["target"] = "_blank";
    restProps["rel"] = "noopener noreferrer";
  }

  return (
    <StarBorder
      as={Component}
      color={color}
      speed="5s"
      thickness={2}
      className={`${className}`}
      innerClassName={`${inner} ${sizePadding[size]}`}
      {...restProps}
    >
      {children}
    </StarBorder>
  );
}


export default StarButton;
