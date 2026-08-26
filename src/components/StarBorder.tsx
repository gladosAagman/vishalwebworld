import "./StarBorder.css";

import type { ElementType, ReactNode } from "react";

type StarBorderProps = {
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
  [key: string]: unknown;
};

export function StarBorder({
  as: Component = "button",
  className = "",
  innerClassName = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`star-border-container ${className}`}
      {...rest}
    >
      <span
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          animationDuration: speed,
          filter: `blur(${thickness}px)`,
        }}
      />
      <span
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          animationDuration: speed,
          filter: `blur(${thickness}px)`,
        }}
      />
      <span className={`inner-content ${innerClassName}`}>{children}</span>
    </Component>
  );
}

export default StarBorder;
