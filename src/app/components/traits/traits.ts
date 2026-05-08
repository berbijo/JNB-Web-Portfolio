import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { TRAITS } from '../../constants/portfolio.constants';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-traits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traits.html',
  styleUrl: './traits.scss',
})
export class Traits implements AfterViewInit {

  @ViewChildren('traitRow')
  traitRows!: QueryList<ElementRef<HTMLElement>>;

  traits = TRAITS;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    this.traitRows.forEach((row, i) => {

      const el = row.nativeElement;

      const word =
        el.querySelector('.traits__word') as HTMLElement;

      const desc =
        el.querySelector('.traits__description') as HTMLElement | null;

      const chars =
        Array.from(
          el.querySelectorAll('.traits__char')
        ) as HTMLElement[];

      let activeChars: HTMLElement[] = [];

      /* ── Scroll reveal ───────────────────── */
      gsap.from(el, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });

      /* ── Hover enter ───────────────────── */
      el.addEventListener('mouseenter', () => {

        /* kill previous char tweens */
        gsap.killTweensOf(chars);

        /* clean ALL chars first */
        gsap.set(chars, {
          clearProps: 'all'
        });

        activeChars = [];

        /* row bg */
        gsap.to(el, {
          background:
            'linear-gradient(90deg, #f6f6f600 30%, #fdb56d 60%, #E57C32 100%)',
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        });

        /* word movement */
        gsap.to(word, {
          x: 12,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        });

        /* desc reveal */
        if (desc) {
          gsap.to(desc, {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          });
        }

        /* random chars */
        activeChars =
          chars.filter(() => Math.random() > 0.55);

        activeChars.forEach((char) => {

          gsap.to(char, {
            x: gsap.utils.random(-4, 4),
            y: gsap.utils.random(-2, 2),

            scale: gsap.utils.random(1.02, 1.06),

            rotation: gsap.utils.random(-4, 4),

            color: '#E57C32',

            duration: 0.28,
            ease: 'power2.out',

            overwrite: true,
          });

        });

      });

      /* ── Hover leave ───────────────────── */
      el.addEventListener('mouseleave', () => {
        resetRow();
      });

      /* ── Reset on scroll ───────────────── */
      ScrollTrigger.create({
        trigger: el,

        onLeave: () => {
          resetRow();
        },

        onLeaveBack: () => {
          resetRow();
        }
      });

      /* ── Reset ─────────────────────────── */
      function resetRow() {

        /* stop all active tweens */
        gsap.killTweensOf(chars);

        /* row bg */
        gsap.to(el, {
          background: 'transparent',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        });

        /* word */
        gsap.to(word, {
          x: 0,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        });

        /* desc */
        if (desc) {
          gsap.to(desc, {
            opacity: 0,
            x: -10,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: true,
          });
        }

        /* animate chars back */
        gsap.to(activeChars, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,

          color: 'var(--color-text-primary)',

          duration: 0.32,
          ease: 'power2.out',

          overwrite: true,

          onComplete: () => {

            /* CLEAN FINAL STATE */
            gsap.set(activeChars, {
              clearProps: 'all'
            });

          }
        });

      }

    });

  }

}