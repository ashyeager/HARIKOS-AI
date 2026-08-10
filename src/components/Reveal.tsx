import { motion, useReducedMotion } from "motion/react";
import type { ButtonHTMLAttributes, ElementType, MouseEventHandler, ReactNode } from "react";
import { useMemo } from "react";

type RevealProps = {
  as?: "div" | "article" | "button";
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export default function Reveal({
  as,
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = useMemo(() => motion.create(as ?? "div") as ElementType, [as]);

  return (
    <Component
      initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.988, filter: "blur(7px)" }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
