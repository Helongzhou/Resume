"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Props = {
  src: string;
  alt: string;
};

// Keep both branches of each range the same type, otherwise the ternary widens
// to `string[] | number[]` and `useTransform` cannot pick an overload.
const Y_MOVING: string[] = ["-6%", "6%"];
const Y_STILL: string[] = ["0%", "0%"];
const SCALE_MOVING: number[] = [1.08, 1, 1.04];
const SCALE_STILL: number[] = [1, 1, 1];

export function ParallaxCover({ src, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? Y_STILL : Y_MOVING);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? SCALE_STILL : SCALE_MOVING,
  );

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[2.1/1]"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 1120px) 100vw, 1120px"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-60" />
    </div>
  );
}
