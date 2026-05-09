import Lenis from 'lenis';
import { isPlatformBrowser } from '@angular/common';

export function createLenis(platformId: Object) {
  return () => {
    if (!isPlatformBrowser(platformId)) return;

    const lenis = new Lenis({
      duration: 2,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };
}