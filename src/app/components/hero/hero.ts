import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';

import {
  isPlatformBrowser,
  CommonModule
} from '@angular/common';

import { OWNER, BIO }
from '../../constants/portfolio.constants';

import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnDestroy {

  @ViewChild('heroSection')
  heroSection!: ElementRef<HTMLElement>;

  @ViewChild('blob')
  blob!: ElementRef<HTMLDivElement>;

  @ViewChild('pill')
  pill!: ElementRef<HTMLElement>;

  @ViewChild('ownerName')
  ownerName!: ElementRef<HTMLElement>;

  @ViewChild('scrollIndicator')
  scrollIndicator!: ElementRef<HTMLElement>;

  private ngZone     = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private playPillAnimation!: () => void;

  owner = OWNER;
  bio   = BIO;

  /* ── Blob lerp state ───────────────────── */
  private mouseX = 0;
  private mouseY = 0;

  private blobX = 0;
  private blobY = 0;

  private readonly LERP = 0.055;

  private rafId: number | null = null;

  private pillInterval: any;

  /* mouse tracking */
  private mouseMoveHandler = (e: MouseEvent) => {

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

  };

  constructor() {

    afterNextRender(() => {

      if (!isPlatformBrowser(this.platformId))
        return;

      /* seed blob */
      this.blobX =
        window.innerWidth / 2;

      this.blobY =
        window.innerHeight / 2;

      this.mouseX = this.blobX;
      this.mouseY = this.blobY;

      document.addEventListener(
        'mousemove',
        this.mouseMoveHandler
      );

      /* RAF outside Angular */
      this.ngZone.runOutsideAngular(() => {

        this.tick();

        this.initAnimations();

      });

    });

  }

  /* ──────────────────────────────────────── */
  ngOnDestroy() {

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    if (this.pillInterval) {
      clearInterval(this.pillInterval);
    }

    if (isPlatformBrowser(this.platformId)) {

      document.removeEventListener(
        'mousemove',
        this.mouseMoveHandler
      );

    }

  }

  /* ──────────────────────────────────────── */
  private tick = () => {

    this.blobX +=
      (this.mouseX - this.blobX)
      * this.LERP;

    this.blobY +=
      (this.mouseY - this.blobY)
      * this.LERP;

    if (this.blob?.nativeElement) {

      this.blob.nativeElement.style.left =
        `${this.blobX}px`;

      this.blob.nativeElement.style.top =
        `${this.blobY}px`;

    }

    this.rafId =
      requestAnimationFrame(this.tick);

  };

  /* ── Hero Intro Animation ─────────────── */
  private initAnimations() {

    const hero =
      this.heroSection.nativeElement;

    const left =
      hero.querySelector('.hero__left');

    const right =
      hero.querySelector('.hero__right');

    const title =
      hero.querySelector('.hero__title');

    const tagline =
      hero.querySelector('.hero__tagline');

    const location =
      hero.querySelector('.hero__location');

    const blob =
      this.blob.nativeElement;

    const scroll =
      this.scrollIndicator.nativeElement;

    /* initial states */
    gsap.set(
      [
        left,
        right,
        title,
        tagline,
        location,
        scroll,
      ],
      {
        opacity: 0,
      }
    );

    gsap.set(left, {
      y: 40,
    });

    gsap.set(right, {
      y: 55,
    });

    gsap.set(scroll, {
      y: 20,
    });

    gsap.set(blob, {
      opacity: 0,
      scale: 0.9,
    });

    /* master timeline */
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      }
    });

    tl.to(blob, {
      opacity: 0.99,
      scale: 1,
      duration: 1.2,
    })

    .to(left, {
      opacity: 1,
      y: 0,
      duration: 0.9,
    }, '-=0.7')

    .to(
      [title, tagline, location],
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
      },
      '-=0.45'
    )

    /* delayed right side */
    .to(right, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.25')

    /* scroll reveal */
    .to(scroll, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.45');

    /* fun pill */
    this.animatePill();

    const ownerName =
      this.ownerName.nativeElement;

    ownerName.addEventListener('mouseenter', () => {

      this.playPillAnimation();

    });

  }

  /* ── Playful Pill Animation ───────────── */
  private animatePill() {

    const pill =
      this.pill.nativeElement;

    this.playPillAnimation = () => {

      gsap.killTweensOf(pill);

      const tl = gsap.timeline();

      tl.set(pill, {
        opacity: 0,
        scale: 0,
        rotate: -14,
        y: 12,
      });

      tl.to(pill, {
        opacity: 1,
        scale: 1,
        rotate: 8,
        y: 0,

        duration: 0.9,
        ease: 'elastic.out(1, 0.45)',
      });

      tl.to(pill, {
        rotate: -4,
        duration: 0.22,
        ease: 'sine.inOut',
      });

      tl.to(pill, {
        rotate: 0,
        duration: 0.22,
        ease: 'sine.inOut',
      });

      tl.to(pill, {
        y: -2,
        repeat: 3,
        yoyo: true,

        duration: 0.8,
        ease: 'sine.inOut',
      });

    };

    /* initial */
    this.playPillAnimation();

    /* repeat */
    this.pillInterval =
      setInterval(() => {

        this.playPillAnimation();

      }, 10000);

  }

  /* ── Bio Highlight Parser ─────────────── */
  parseParagraph(
    text: string,
    highlights: readonly string[]
  ) {

    const parts: {
      text: string;
      highlight: boolean;
    }[] = [];

    let remaining = text;

    while (remaining.length > 0) {

      const found = highlights

        .map(h => ({
          h,
          idx: remaining.indexOf(h)
        }))

        .filter(x => x.idx !== -1)

        .sort((a, b) =>
          a.idx - b.idx
        )[0];

      if (!found) {

        parts.push({
          text: remaining,
          highlight: false
        });

        break;

      }

      if (found.idx > 0) {

        parts.push({
          text: remaining.slice(0, found.idx),
          highlight: false
        });

      }

      parts.push({
        text: found.h,
        highlight: true
      });

      remaining =
        remaining.slice(
          found.idx + found.h.length
        );

    }

    return parts;

  }

  /* ─────────────────────────────────────── */
  get bioParts1() {

    return this.parseParagraph(
      this.bio.paragraph1,
      this.bio.paragraph1Highlights
    );

  }

  get bioParts2() {

    return this.parseParagraph(
      this.bio.paragraph2,
      this.bio.paragraph2Highlights
    );

  }

}