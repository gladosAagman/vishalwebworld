import { StatementReveal } from "@/components/story/StatementReveal";

type RevealTextProps = {
  children: string;
  className?: string;
  eyebrow?: string;
};

/** Section-level statement copy with the line-by-line reveal. */
export function RevealText({ children, className = "", eyebrow }: RevealTextProps) {
  return (
    <StatementReveal className={className} {...(eyebrow ? { eyebrow } : {})}>
      {children}
    </StatementReveal>
  );
}
