"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Reveal growing `target` text with typewriter catch-up. */
export function useStreamTypewriter(target: string, enabled = true, speed = 12) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(() => (reduce || !enabled ? target : ""));
  const shownRef = useRef(shown);
  shownRef.current = shown;

  useEffect(() => {
    if (reduce || !enabled) {
      setShown(target);
      shownRef.current = target;
      return;
    }

    if (target.length < shownRef.current.length) {
      setShown("");
      shownRef.current = "";
    }

    if (shownRef.current.length >= target.length) {
      if (shownRef.current !== target) {
        setShown(target);
        shownRef.current = target;
      }
      return;
    }

    let cancelled = false;
    let timer = 0;

    const tick = () => {
      if (cancelled) return;
      const current = shownRef.current;
      if (current.length >= target.length) {
        setShown(target);
        shownRef.current = target;
        return;
      }
      const lag = target.length - current.length;
      const step = lag > 100 ? 5 : lag > 40 ? 2 : 1;
      const next = target.slice(0, current.length + step);
      shownRef.current = next;
      setShown(next);

      const ch = next[next.length - 1] || "";
      const pause =
        ch === "\n"
          ? speed * 2
          : ch === "。" || ch === "." || ch === "！" || ch === "?" || ch === "？"
            ? speed * 5
            : ch === "，" || ch === "," || ch === "、"
              ? speed * 2
              : speed;
      timer = window.setTimeout(tick, Math.max(8, pause));
    };

    timer = window.setTimeout(tick, speed);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [target, enabled, speed, reduce]);

  const catchingUp = enabled && !reduce && shown.length < target.length;
  return { shown, catchingUp };
}
