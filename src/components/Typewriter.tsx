"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  /** ms per character */
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onDone?: () => void;
};

export function Typewriter({
  text,
  speed = 22,
  className,
  showCursor = true,
  onDone,
}: Props) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (reduce) {
      setShown(text);
      setDone(true);
      onDoneRef.current?.();
      return;
    }

    setShown("");
    setDone(false);
    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        onDoneRef.current?.();
        return;
      }
      const ch = text[i - 1];
      const pause =
        ch === "。" || ch === "." || ch === "！" || ch === "?" || ch === "？"
          ? speed * 8
          : ch === "，" || ch === "," || ch === "、" || ch === ":"
            ? speed * 3
            : speed;
      timer = window.setTimeout(tick, pause);
    };

    let timer = window.setTimeout(tick, speed);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [text, speed, reduce]);

  return (
    <span className={className}>
      {shown}
      {showCursor ? (
        <span
          className={`type-cursor${done ? " type-cursor--done" : ""}`}
          aria-hidden
        />
      ) : null}
    </span>
  );
}
