import {
  Component,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EXPERIENCE } from '../../constants/portfolio.constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type ExperienceTab = 'work' | 'education' | 'awards' | 'technologies';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements AfterViewInit {
  @ViewChild('expSection') expSection!: ElementRef<HTMLElement>;
  @ViewChild('expHeading') expHeading!: ElementRef<HTMLElement>;
  @ViewChild('expTabs') expTabs!: ElementRef<HTMLElement>;
  @ViewChild('expCard') expCard!: ElementRef<HTMLElement>;

  exp = EXPERIENCE;

  tabs: { id: ExperienceTab; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'awards', label: 'Awards and Certifications' },
    { id: 'technologies', label: 'Languages & Technologies' },
  ];

  activeTab = signal<ExperienceTab>('work');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  setTab(id: ExperienceTab) {
    if (this.activeTab() === id) return;

    this.activeTab.set(id);

    requestAnimationFrame(() => {
      const card = this.expCard?.nativeElement;

      if (card) {
        this.animateCardContent(card, id);
      }
    });
  }

  private animateCardContent(card: HTMLElement, tab: ExperienceTab) {
    if (tab === 'work' || tab === 'education' || tab === 'awards') {
      const entries = card.querySelectorAll('.timeline-entry');
      gsap.from(entries, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.1,
        clearProps: 'all',
      });

      const dots = card.querySelectorAll('.timeline-dot');
      gsap.from(dots, {
        scale: 0,
        duration: 0.4,
        ease: 'back.out(2)',
        stagger: 0.1,
        delay: 0.08,
        clearProps: 'all',
      });
    } else if (tab === 'technologies') {
      const cats = card.querySelectorAll('.tech-category');
      gsap.from(cats, {
        y: 20,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.07,
        clearProps: 'all',
      });
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    requestAnimationFrame(() => {
      const section = this.expSection?.nativeElement;
      const heading = this.expHeading?.nativeElement;
      const tabs = this.expTabs?.nativeElement;
      const card = this.expCard?.nativeElement;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const alreadyPast = rect.bottom <= 0;
      const alreadyIn = rect.top < window.innerHeight * 0.85;

      if (alreadyPast || alreadyIn) {
        requestAnimationFrame(() => {
          if (card) this.animateCardContent(card, 'work');
        });
        return;
      }

      if (heading) {
        gsap.from(heading, {
          x: -50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        });
      }

      if (tabs) {
        const tabButtons = tabs.querySelectorAll('.tab-item');
        gsap.from(tabButtons, {
          y: 12,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: tabs,
            start: 'top 88%',
            once: true,
          },
        });
      }

      if (card) {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,

            onEnter: () => {
              requestAnimationFrame(() => {
                this.animateCardContent(card, 'work');
              });
            },
          },
        });
      }

      ScrollTrigger.refresh(true);
    });
  }
}
