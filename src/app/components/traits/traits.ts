import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

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
export class Traits implements AfterViewInit, OnDestroy {
  @ViewChild('traitsSection')
  traitsSection!: ElementRef<HTMLElement>;

  @ViewChildren('traitRow')
  traitRows!: QueryList<ElementRef<HTMLElement>>;

  traits = TRAITS;

  private revealTimeline?: gsap.core.Timeline;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object,
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    requestAnimationFrame(() => {
      const rows = this.traitRows.toArray();

      const section = this.traitsSection.nativeElement;

      const sectionRect = section.getBoundingClientRect();

      const alreadyPast = sectionRect.bottom <= 0;

      const alreadyInView = sectionRect.top < window.innerHeight * 0.85;

      if (alreadyPast || alreadyInView) {
        rows.forEach((row) => {
          gsap.killTweensOf(row.nativeElement);

          gsap.set(row.nativeElement, {
            clearProps: 'all',
            opacity: 1,
            x: 0,
          });
        });
      } else {
        gsap.set(
          rows.map((r) => r.nativeElement),
          {
            x: -60,
            opacity: 0,
          },
        );

        this.revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,

            onLeave: () => {
              rows.forEach((row) => {
                gsap.killTweensOf(row.nativeElement);

                gsap.set(row.nativeElement, {
                  clearProps: 'all',
                  opacity: 1,
                  x: 0,
                });
              });
            },
          },
        });

        rows.forEach((row, i) => {
          this.revealTimeline?.to(
            row.nativeElement,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            i * 0.12,
          );
        });
      }

      rows.forEach((row) => {
        const el = row.nativeElement;

        const word = el.querySelector('.traits__word') as HTMLElement;

        const desc = el.querySelector('.traits__description') as HTMLElement | null;

        const chars = Array.from(el.querySelectorAll('.traits__char')) as HTMLElement[];

        let activeChars: HTMLElement[] = [];

        el.addEventListener('mouseenter', () => {
          gsap.killTweensOf(chars);

          gsap.set(chars, {
            clearProps: 'all',
          });

          activeChars = [];

          gsap.to(el, {
            background: 'linear-gradient(90deg, #f6f6f600 30%, #fdb56d 60%, #E57C32 100%)',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          });

          gsap.to(word, {
            x: 12,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          });

          if (desc) {
            gsap.to(desc, {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: true,
            });
          }

          activeChars = chars.filter(() => Math.random() > 0.55);

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

        el.addEventListener('mouseleave', () => resetRow());

        ScrollTrigger.create({
          trigger: el,

          onLeave: () => resetRow(),
          onLeaveBack: () => resetRow(),
        });

        function resetRow() {
          gsap.killTweensOf(chars);

          gsap.to(el, {
            background: 'transparent',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true,
          });

          gsap.to(word, {
            x: 0,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          });

          if (desc) {
            gsap.to(desc, {
              opacity: 0,
              x: -10,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: true,
            });
          }

          gsap.to(activeChars, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            color: 'var(--color-text-primary)',
            duration: 0.32,
            ease: 'power2.out',
            overwrite: true,

            onComplete: () =>
              gsap.set(activeChars, {
                clearProps: 'all',
              }),
          });
        }
      });

      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy(): void {
    this.revealTimeline?.kill();

    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });
  }
}
