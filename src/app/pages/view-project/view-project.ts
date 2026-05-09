import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  signal,
  computed,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECTS, Project } from '../../constants/portfolio.constants';
import { gsap } from 'gsap';
import { NavigationService } from '../../../navigation.service';
import { Cursor } from '../../components/cursor/cursor';

@Component({
  selector: 'app-view-project',
  imports: [CommonModule, Cursor],
  templateUrl: './view-project.html',
  styleUrl: './view-project.scss',
})
export class ViewProject implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidebarLine') sidebarLine!: ElementRef<HTMLElement>;
  @ViewChild('backBtn') backBtn!: ElementRef<HTMLElement>;
  @ViewChild('pageTitle') pageTitleEl!: ElementRef<HTMLElement>;
  @ViewChild('carouselWrap') carouselWrap!: ElementRef<HTMLElement>;
  @ViewChild('carouselInner') carouselInner!: ElementRef<HTMLElement>;
  @ViewChild('contentArea') contentArea!: ElementRef<HTMLElement>;
  @ViewChildren('slideEl') slideEls!: QueryList<ElementRef<HTMLElement>>;

  project = signal<Project | null>(null);
  notFound = signal(false);

  currentIndex = signal(0);
  isAnimating = false;

  slides = computed<string[]>(() => {
    const p = this.project();
    if (!p) return [];
    const all = [p.previewImage, ...(p.gallery ?? [])];
    return all.filter((src, i, arr) => arr.indexOf(src) === i);
  });

  private ctx: gsap.Context | null = null;
  private nav = inject(NavigationService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = PROJECTS.find((p) => p.id === id) ?? null;
    this.project.set(found);
    if (!found) this.notFound.set(true);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId) || !this.project()) return;

    const shouldAnimate = !this.nav.cameFrom(`/project/${this.project()?.id}`);

    if (!shouldAnimate) {
      this.setInstantState();
      return;
    }

    requestAnimationFrame(() => {
      this.ctx = gsap.context(() => {
        this.playIntro();
      });
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }

  private playIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (this.sidebarLine?.nativeElement) {
      tl.from(
        this.sidebarLine.nativeElement,
        {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1,
        },
        0,
      );
    }

    if (this.backBtn?.nativeElement) {
      tl.from(
        this.backBtn.nativeElement,
        {
          opacity: 0,
          x: -8,
          duration: 0.5,
        },
        0.3,
      );
    }

    if (this.pageTitleEl?.nativeElement) {
      tl.from(
        this.pageTitleEl.nativeElement,
        {
          y: 32,
          opacity: 0,
          duration: 0.75,
        },
        0.15,
      );
    }

    if (this.carouselWrap?.nativeElement) {
      tl.from(
        this.carouselWrap.nativeElement,
        {
          y: 56,
          opacity: 0,
          duration: 0.85,
        },
        0.3,
      );
    }

    if (this.contentArea?.nativeElement) {
      const cols = this.contentArea.nativeElement.querySelectorAll(
        '.detail__stack, .detail__about',
      );

      tl.from(
        cols,
        {
          y: 30,
          opacity: 0,
          duration: 0.65,
          stagger: 0.14,
        },
        0.55,
      );
    }
  }

  private setInstantState() {
    gsap.set(
      [
        this.sidebarLine?.nativeElement,
        this.backBtn?.nativeElement,
        this.pageTitleEl?.nativeElement,
        this.carouselWrap?.nativeElement,
        this.contentArea?.nativeElement,
      ],
      {
        opacity: 1,
        y: 0,
      },
    );

    if (this.sidebarLine?.nativeElement) {
      gsap.set(this.sidebarLine.nativeElement, {
        scaleY: 1,
      });
    }
  }

  goTo(index: number) {
    if (this.isAnimating) return;
    if (index === this.currentIndex()) return;
    if (!isPlatformBrowser(this.platformId)) {
      this.currentIndex.set(index);
      return;
    }

    const allSlides = this.slideEls?.toArray();
    if (!allSlides?.length) {
      this.currentIndex.set(index);
      return;
    }

    this.isAnimating = true;
    const dir = index > this.currentIndex() ? 1 : -1;
    const outSlide = allSlides[this.currentIndex()]?.nativeElement;
    const inSlide = allSlides[index]?.nativeElement;

    if (!outSlide || !inSlide) {
      this.currentIndex.set(index);
      this.isAnimating = false;
      return;
    }

    gsap.set(inSlide, { display: 'block', x: `${100 * dir}%`, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(outSlide, { display: 'none', x: '0%' });
        this.currentIndex.set(index);
        this.isAnimating = false;
      },
      defaults: { duration: 0.5, ease: 'power2.inOut' },
    });

    tl.to(outSlide, { x: `${-100 * dir}%`, opacity: 0 }, 0);

    tl.to(inSlide, { x: '0%', opacity: 1 }, 0);

    const inImg = inSlide.querySelector('img') as HTMLImageElement | null;
    if (inImg) {
      tl.fromTo(inImg, { scale: 1.06 }, { scale: 1, duration: 0.7, ease: 'power2.out' }, 0);
    }
  }

  prev() {
    const prev = this.currentIndex() - 1;
    this.goTo(prev < 0 ? this.slides().length - 1 : prev);
  }

  next() {
    const next = this.currentIndex() + 1;
    this.goTo(next >= this.slides().length ? 0 : next);
  }

  goBack() {
    window.history.back();
  }

  parseParagraph(text: string, highlights: string[] = []) {
    const parts: { text: string; highlight: boolean }[] = [];
    let remaining = text;
    while (remaining.length > 0) {
      const found = highlights
        .map((h) => ({ h, idx: remaining.indexOf(h) }))
        .filter((x) => x.idx !== -1)
        .sort((a, b) => a.idx - b.idx)[0];
      if (!found) {
        parts.push({ text: remaining, highlight: false });
        break;
      }
      if (found.idx > 0) parts.push({ text: remaining.slice(0, found.idx), highlight: false });
      parts.push({ text: found.h, highlight: true });
      remaining = remaining.slice(found.idx + found.h.length);
    }
    return parts;
  }
}
