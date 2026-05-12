import {
  Component,
  HostListener,
  signal,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import { gsap } from 'gsap';

import {
  CommonModule,
  isPlatformBrowser,
} from '@angular/common';

import {
  OWNER,
  NAV_LINKS,
} from '../../constants/portfolio.constants';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize viewport check in constructor BEFORE template renders
    if (isPlatformBrowser(this.platformId)) {
      this.isCompact.set(window.innerWidth < 900);
    }
  }

  owner = OWNER;

  navLinks = NAV_LINKS;

  logo = 'assets/jnb_logo.png';

  isScrolled = signal(false);

  menuOpen = signal(false);

  showBrand = signal(false);

  navbarHidden = signal(false);

  themeIcon = signal<string>('');

  isCompact = signal(false);

  theme = signal<'light' | 'dark'>('light');

  private lastScrollY = 0;

  /*
  =========================================
  VIEWCHILDS
  =========================================
  */

  @ViewChild('navbarRef')
  navbarRef!: ElementRef<HTMLElement>;

  @ViewChild('brandRef')
  brandRef!: ElementRef<HTMLElement>;

  @ViewChild('linksRef')
  linksRef!: ElementRef<HTMLElement>;

  @ViewChild('actionsRef')
  actionsRef?: ElementRef<HTMLElement>;

  /*
  =========================================
  INIT
  =========================================
  */

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId))
      return;

    this.checkViewport();

    const savedTheme =
      localStorage.getItem('theme') as
      'light' | 'dark' | null;

    const prefersDark =
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

    const initialTheme =
      savedTheme ??
      (prefersDark ? 'dark' : 'light');

    this.applyTheme(initialTheme);

  }

  /*
  =========================================
  INITIAL GSAP STATE
  =========================================
  */

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId))
      return;

    const brand =
      this.brandRef?.nativeElement;

    const links =
      Array.from(
        this.linksRef?.nativeElement
          ?.querySelectorAll('button') ?? []
      );

    // Only get actions if they exist (desktop only)
    const actions = this.actionsRef
      ? Array.from(this.actionsRef.nativeElement?.children ?? [])
      : [];

    // Filter out null/undefined elements
    const elementsToAnimate = [
      brand,
      ...links,
      ...actions,
    ].filter(Boolean);

    if (elementsToAnimate.length > 0) {
      gsap.set(
        elementsToAnimate,
        {
          opacity: 0,
          y: -24,
          filter: 'blur(8px)',
        }
      );
    }

    /*
      WAIT FOR HERO LOADER
    */

    window.addEventListener(
      'hero-loader-complete',
      () => {
        this.playEntranceAnimation();
      },
      { once: true }
    );

  }

  /*
  =========================================
  NAVBAR ENTRANCE
  CALLED FROM HERO
  =========================================
  */

  public playEntranceAnimation(): void {

    const brand =
      this.brandRef?.nativeElement;

    const links =
      Array.from(
        this.linksRef?.nativeElement
          ?.querySelectorAll('button') ?? []
      );

    const actions = this.actionsRef
      ? Array.from(this.actionsRef.nativeElement?.children ?? [])
      : [];

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    /*
    BRAND
    */

    if (brand) {

      tl.to(
        brand,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',

          duration: 0.75,
        }
      );

    }

    /*
    LINKS
    */

    if (links.length) {

      tl.to(
        links,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',

          stagger: 0.08,

          duration: 0.55,

          clearProps: 'all',
        },
        '-=0.45'
      );

    }

    /*
    ACTIONS
    */

    if (actions.length) {

      tl.to(
        actions,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',

          stagger: 0.06,

          duration: 0.5,

          clearProps: 'all',
        },
        '-=0.42'
      );

    }

  }

  /*
  =========================================
  SCROLL
  =========================================
  */

  @HostListener('window:scroll')
  onScroll(): void {

    const currentY = window.scrollY;

    this.isScrolled.set(currentY > 20);

    this.showBrand.set(currentY > 80);

    if (currentY < 80) {

      this.navbarHidden.set(false);

    } else {

      const scrollingDown =
        currentY > this.lastScrollY;

      this.navbarHidden.set(
        scrollingDown && !this.menuOpen()
      );

    }

    this.lastScrollY = currentY;

  }

  /*
  =========================================
  RESIZE
  =========================================
  */

  @HostListener('window:resize')
  onResize(): void {

    if (!isPlatformBrowser(this.platformId))
      return;

    this.checkViewport();

  }

  private checkViewport(): void {

    if (!isPlatformBrowser(this.platformId))
      return;

    const wasCompact = this.isCompact();
    const nowCompact = window.innerWidth < 900;

    if (wasCompact !== nowCompact) {
      this.isCompact.set(nowCompact);
      this.cdr.detectChanges();
    }

  }

  /*
  =========================================
  MENU
  =========================================
  */

  toggleMenu(): void {

    this.menuOpen.update(v => !v);

    this.navbarHidden.set(false);

  }

  closeMenu(): void {

    this.menuOpen.set(false);

  }

  /*
  =========================================
  THEME
  =========================================
  */

  toggleTheme(): void {

    const next =
      this.theme() === 'dark'
        ? 'light'
        : 'dark';

    this.applyTheme(next);

  }

  private applyTheme(
    theme: 'light' | 'dark'
  ): void {

    this.theme.set(theme);

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    localStorage.setItem(
      'theme',
      theme
    );

    this.setLogo(theme);

  }

  setLogo(theme: string): void {

    this.logo =
      theme === 'dark'
        ? 'assets/jnb_favicon.png'
        : 'assets/jnb_logo.png';

  }

  /*
  =========================================
  SCROLL TO
  =========================================
  */

  scrollTo(anchor: string): void {

    if (!isPlatformBrowser(this.platformId))
      return;

    const el = document.querySelector(anchor);

    if (el && (window as any).lenis) {

      (window as any).lenis.scrollTo(el, {

        duration: 1.0,

        easing: (t: number) =>
          1 - Math.pow(1 - t, 3),

      });

    }

    this.closeMenu();

  }

  /*
  =========================================
  RESUME
  =========================================
  */

  openResume(): void {

    if (!isPlatformBrowser(this.platformId))
      return;

    window.open('/resume', '_blank');

  }

}