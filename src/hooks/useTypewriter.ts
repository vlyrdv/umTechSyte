import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type TypewriterOptions = {
  enabled?: boolean;
  speed?: number;
  startDelay?: number;
};

export function useTypewriter(text: string, options: TypewriterOptions = {}) {
  const { enabled = true, speed = 24, startDelay = 0 } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayedText, setDisplayedText] = useState(() =>
    prefersReducedMotion && enabled ? text : ""
  );
  const [isDone, setIsDone] = useState(() => prefersReducedMotion && enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText("");
      setIsDone(false);
      return;
    }

    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    setDisplayedText("");
    setIsDone(false);

    let index = 0;
    let intervalId: number | undefined;

    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length) {
          if (intervalId) {
            window.clearInterval(intervalId);
          }
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [enabled, prefersReducedMotion, speed, startDelay, text]);

  return { displayedText, isDone };
}
