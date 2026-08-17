"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  distance = 40,
  direction = "up",
  threshold = 0.18,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  // Progressive enhancement: deterministic initial state (false) for SSR and first client render
  // Then enable enhancement after mount inside useEffect to avoid hydration mismatch.
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const timers: number[] = [];

    // Defer enhancement enablement to avoid synchronous state updates during the effect
    timers.push(
      (setTimeout(() => {
        setIsEnhanced(true);
      }, 0) as unknown) as number
    );

    // Respect reduced-motion: if user prefers reduced motion, reveal immediately and skip observer
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = mq ? mq.matches : false;
    if (prefersReduced) {
      timers.push(((setTimeout(() => {
        setIsVisible(true);
      }, 0)) as unknown) as number);
      return () => {
        timers.forEach((t) => clearTimeout(t));
      };
    }

    // If IntersectionObserver not supported, reveal immediately
    if (!('IntersectionObserver' in window)) {
      timers.push(((setTimeout(() => {
        setIsVisible(true);
      }, 0)) as unknown) as number);
      return () => {
        timers.forEach((t) => clearTimeout(t));
      };
    }

    // Check if element is already in viewport (for immediate reveals)
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isInitiallyVisible = rect.top < windowHeight * 0.85;

    if (isInitiallyVisible) {
      timers.push(((setTimeout(() => {
        setIsVisible(true);
      }, 0)) as unknown) as number);
      return () => {
        timers.forEach((t) => clearTimeout(t));
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, [once, threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-distance": `${distance}px`,
  } as CSSProperties;

  const classes = [
    "scroll-reveal",
    `scroll-reveal--${direction}`,
    isEnhanced ? "is-enhanced" : "",
    isVisible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={elementRef} className={classes} style={style}>
      {children}
    </div>
  );
}
