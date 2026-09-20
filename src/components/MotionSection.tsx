"use client";

import { useReducedMotion, motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionSection({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, y: 36, filter: "blur(10px)", scale: 0.985 }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px", amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : 0.7,
        ease,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
