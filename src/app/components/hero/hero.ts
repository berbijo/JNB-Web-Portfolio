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
  CommonModule,
} from '@angular/common';

import {
  OWNER,
  BIO,
  TRAITS,
} from '../../constants/portfolio.constants';

import { gsap } from 'gsap';

import { AnimationStateService }
  from '../../../animation-state.service';

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

  @ViewChild('blobTopLeft')
  blobTopLeft!: ElementRef<HTMLDivElement>;

  @ViewChild('blobBottomRight')
  blobBottomRight!: ElementRef<HTMLDivElement>;

  @ViewChild('pill')
  pill!: ElementRef<HTMLElement>;

  @ViewChild('ownerName')
  ownerName!: ElementRef<HTMLElement>;

  @ViewChild('scrollIndicator')
  scrollIndicator!: ElementRef<HTMLElement>;

  @ViewChild('heroLoader')
  heroLoader!: ElementRef<HTMLElement>;

  @ViewChild('loaderText')
  loaderText!: ElementRef<HTMLElement>;

  @ViewChild('loaderBar')
  loaderBar!: ElementRef<HTMLElement>;

  private ngZone = inject(NgZone);

  private platformId =
    inject(PLATFORM_ID);

  private animState =
    inject(AnimationStateService);

  private playPillAnimation!: () => void;

  owner = OWNER;

  bio = BIO;

  traits = TRAITS;

  private pillInterval: any;

  constructor() {

    afterNextRender(() => {

      if (!isPlatformBrowser(this.platformId))
        return;

      this.ngZone.runOutsideAngular(() => {

        if (
          this.animState.shouldPlayHero()
        ) {

          this.playIntroSequence();

          this.animState.setHeroPlayed();

        } else {

          this.skipIntroState();

        }

      });

    });

  }

  ngOnDestroy(): void {

    if (this.pillInterval) {

      clearInterval(
        this.pillInterval
      );

    }

  }

  /*
  =========================================
  SKIP INTRO STATE
  =========================================
  */

  private skipIntroState(): void {

    gsap.set(
      this.heroLoader?.nativeElement,
      {
        display: 'none',
      }
    );

    const hero = this.heroSection.nativeElement;

    gsap.set(
      [
        hero.querySelector('.hero__name'),
        hero.querySelector('.hero__title'),
        hero.querySelector('.hero__tagline'),
        hero.querySelector('.hero__location'),
        hero.querySelector('.reach__btn'),
        this.pill?.nativeElement,
      ],
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'none',
      },
    );

    gsap.set(
      [
        hero.querySelector('.hero__blob--top'),
        hero.querySelector('.hero__blob--bottom'),
      ],
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(40px)',
      }
    );

    window.dispatchEvent(
      new CustomEvent(
        'hero-loader-complete'
      )
    );

    this.animatePill();

  }

  /*
  =========================================
  LOADER ANIMATION
  =========================================
  */

  private playIntroSequence(): void {

    const loader = this.heroLoader.nativeElement;
    const loaderText = this.loaderText.nativeElement;
    const loaderBar = this.loaderBar.nativeElement;
    const chars = loaderText.querySelectorAll('.char');

    // Show loader
    gsap.set(loader, {
      display: 'flex',
      opacity: 1,
    });

    // Animate loader text chars
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );

    // Animate loader bar
    gsap.to(loaderBar, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
      delay: 0.5,
      onComplete: () => {
        // Fade out loader
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(loader, { display: 'none' });
            // Start hero animations
            this.initAnimations();
          },
        });
      },
    });

  }

  /*
  =========================================
  HERO ENTRANCE - TOP TO BOTTOM
  =========================================
  */

  private initAnimations(): void {

    const hero = this.heroSection.nativeElement;

    const location = hero.querySelector('.hero__location');
    const name = hero.querySelector('.hero__name');
    const title = hero.querySelector('.hero__title');
    const tagline = hero.querySelector('.hero__tagline');
    const button = hero.querySelector('.reach__btn');

    const blobTop = hero.querySelector('.hero__blob--top');
    const blobBottom = hero.querySelector('.hero__blob--bottom');

    // Elements already hidden by CSS, no need to set initial states

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    /*
      FIRE NAVBAR ANIMATION FIRST
    */

    tl.call(() => {
      window.dispatchEvent(
        new CustomEvent('hero-loader-complete')
      );
    })

    // Wait a bit for navbar to start
    .to({}, { duration: 0.3 })

    /*
      BLOBS FADE IN
    */

    .to(
      [blobTop, blobBottom],
      {
        opacity: 0.9,
        scale: 1,
        filter: 'blur(40px)',
        duration: 1.5,
        stagger: 0.15,
      },
      '-=0.1'
    )

    /*
      HERO CONTENT - TOP TO BOTTOM
    */

    // 1. Location (top)
    .fromTo(
      location,
      {
        opacity: 0,
        y: -20,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
      },
      '-=1.0'
    )

    // 2. Name
    .fromTo(
      name,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.0,
      },
      '-=0.5'
    )

    // 3. Title
    .fromTo(
      title,
      {
        opacity: 0,
        y: 25,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
      },
      '-=0.6'
    )

    // 4. Tagline
    .fromTo(
      tagline,
      {
        opacity: 0,
        y: 20,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
      },
      '-=0.5'
    )

    // 5. Button (bottom)
    .fromTo(
      button,
      {
        opacity: 0,
        y: 20,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
      },
      '-=0.4'
    );

    // Animate pill after everything else
    tl.add(() => {
      this.animatePill();
    }, '-=0.3');

    const ownerName = this.ownerName.nativeElement;

    ownerName.addEventListener('mouseenter', () => {
      this.playPillAnimation();
    });

  }

  /*
  =========================================
  PILL
  =========================================
  */

  private animatePill(): void {

    const pill = this.pill.nativeElement;

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

    this.playPillAnimation();

    this.pillInterval = setInterval(() => {
      this.playPillAnimation();
    }, 10000);

  }

  /*
  =========================================
  PARSER
  =========================================
  */

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

      const found =
        highlights
          .map((h) => ({
            h,
            idx: remaining.indexOf(h),
          }))
          .filter((x) => x.idx !== -1)
          .sort((a, b) => a.idx - b.idx)[0];

      if (!found) {
        parts.push({
          text: remaining,
          highlight: false,
        });
        break;
      }

      if (found.idx > 0) {
        parts.push({
          text: remaining.slice(0, found.idx),
          highlight: false,
        });
      }

      parts.push({
        text: found.h,
        highlight: true,
      });

      remaining = remaining.slice(
        found.idx + found.h.length
      );

    }

    return parts;

  }

  toggleTrait(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.innerWidth > 720) return; // Only on mobile

    const block = (event.currentTarget as HTMLElement);
    const row = block.closest('.row');
    
    // Close if already expanded
    if (block.classList.contains('expanded')) {
      block.classList.remove('expanded');
      row?.classList.remove('has-expanded');
      return;
    }

    // Close any other expanded blocks
    const allBlocks = document.querySelectorAll('.block.expanded');
    allBlocks.forEach(b => {
      b.classList.remove('expanded');
      b.closest('.row')?.classList.remove('has-expanded');
    });

    // Expand this block
    block.classList.add('expanded');
    row?.classList.add('has-expanded');
  }

  closeTrait(event: Event): void {
    event.stopPropagation(); // Prevent triggering toggleTrait
    
    const button = event.currentTarget as HTMLElement;
    const block = button.closest('.block');
    const row = block?.closest('.row');
    
    block?.classList.remove('expanded');
    row?.classList.remove('has-expanded');
  }

  /*
  =========================================
  SCROLL
  =========================================
  */

  scrollTo(anchor: string): void {

    const el = document.querySelector(anchor);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

  }

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