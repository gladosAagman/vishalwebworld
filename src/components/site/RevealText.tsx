import { ScrollReveal } from "@/components/ScrollReveal";

type RevealTextProps = {
  children: string;
  className?: string;
};

/** Section-level statement text with GSAP scroll-linked word reveal. */
export function RevealText({ children, className = "" }: RevealTextProps) {
  return (
    <section className={`mx-auto max-w-5xl px-4 py-14 sm:py-20 ${className}`}>
      <ScrollReveal
        baseOpacity={0}
        baseRotation={4}
        blurStrength={5}
        containerClassName="!my-0"
        textClassName="text-balance font-display text-foreground"
      >
        {children}
      </ScrollReveal>
    </section>
  );
}
