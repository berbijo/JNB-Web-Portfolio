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

  private scrollTriggers: ScrollTrigger[] = [];

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

      const rowData = rows.map((row) => {
        const el = row.nativeElement;

        return {
          el,
          word: el.querySelector('.traits__word') as HTMLElement,
          desc: el.querySelector('.traits__description') as HTMLElement | null,
          chars: Array.from(
            el.querySelectorAll('.traits__char')
          ) as HTMLElement[],
        };
      });

      /*
      -----------------------------------
      DESKTOP HOVER INTERACTIONS
      -----------------------------------
      */

      rowData.forEach((row) => {
        const { el, word, desc, chars } = row;

        const activateRow = () => {
          gsap.to(el, {
            background:
              'linear-gradient(90deg, #f6f6f600 30%, #fdb56d 60%, #E57C32 100%)',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });

          gsap.to(word, {
            x: 12,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });

          if (desc) {
            gsap.to(desc, {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          chars.forEach((char) => {
            if (Math.random() > 0.55) {
              gsap.to(char, {
                x: gsap.utils.random(-4, 4),
                y: gsap.utils.random(-2, 2),
                scale: gsap.utils.random(1.02, 1.06),
                rotation: gsap.utils.random(-4, 4),
                color: '#E57C32',
                duration: 0.28,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          });
        };

        const resetRow = () => {
          gsap.to(el, {
            background: 'transparent',
            duration: 0.25,
            overwrite: 'auto',
          });

          gsap.to(word, {
            x: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });

          if (desc) {
            gsap.to(desc, {
              opacity: 0,
              x: -10,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          gsap.to(chars, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            color: 'var(--color-text-primary)',
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };
        el.addEventListener('mouseenter', () => {
          if (window.innerWidth <= 767) return;
          activateRow();
        });

        el.addEventListener('mouseleave', () => {
          if (window.innerWidth <= 767) return;
          resetRow();
        });

        (row as any).activateRow = activateRow;
        (row as any).resetRow = resetRow;
      });

      /*
      -----------------------------------
      MOBILE ACTIVE ROW SYSTEM (UNCHANGED)
      -----------------------------------
      */

      if (window.innerWidth <= 767) {
        let activeIndex = -1;

        const setActiveRow = (index: number) => {
          if (index === activeIndex) return;

          activeIndex = index;

          rowData.forEach((row, i) => {
            const activate = (row as any).activateRow;
            const reset = (row as any).resetRow;

            if (i === index) {
              activate?.();
            } else {
              reset?.();
            }
          });
        };

        const mobileTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true,

          onUpdate: (self) => {
            const totalRows = rowData.length;

            const progress = gsap.utils.clamp(0, 0.9999, self.progress);

            const index = Math.floor(progress * totalRows);

            setActiveRow(index);
          },
        });

        this.scrollTriggers.push(mobileTrigger);
      }

      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach((trigger) => trigger.kill());
  }
}