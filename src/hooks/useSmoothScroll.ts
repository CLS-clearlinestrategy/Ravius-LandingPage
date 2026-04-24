import { useEffect, useRef } from "react";
import Lenis from "lenis";
// ─── Centralized GSAP module: single registration, no duplicate side-effects ──
import { gsap } from "@/lib/gsap";

export let globalLenis: Lenis | null = null;

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // ─── Single coordinated RAF: GSAP drives Lenis ───────────────────────────
    // Both share one 60/90/120 Hz loop → eliminates scroll-jitter from
    // out-of-phase requestAnimationFrame calls competing for the frame budget.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    // Prevents GSAP from compensating for elapsed time after a tab loses focus,
    // which would cause a jarring "catch-up" jump when the user returns.
    gsap.ticker.lagSmoothing(0);

    // Handle anchor clicks
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      if (globalLenis === lenis) globalLenis = null;
    };
  }, []);

  return lenisRef;
}
