import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import gsap from 'gsap';

import { PROJECTS, Project } from '../../../constants/portfolio.constants';
import { RevealAnimations } from '../../../../gsap-animation';

@Component({
  selector: 'app-myprojects',
  imports: [RouterLink],
  templateUrl: './myprojects.html',
  styleUrl: './myprojects.scss',
})
export class Myprojects implements OnInit, AfterViewInit, OnDestroy {

  projects = PROJECTS;

  showAll = false;

  private tweens: gsap.core.Tween[] = [];

  private observer: IntersectionObserver | null = null;

  private revealObserver: IntersectionObserver | null = null;

  get displayedProjects(): Project[] {
    return this.showAll
      ? this.projects
      : this.projects.slice(0, 2);
  }

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {}

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    this.showAll =
      localStorage.getItem('projects_show_all') === 'true';
  }

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      this.setupMarquees();
      this.setupRevealAnimations();
    });
  }

  ngOnDestroy(): void {

    this.killMarquees();

    this.observer?.disconnect();

    this.revealObserver?.disconnect();
  }

  getFirstRow(techs: string[]) {
    return techs.slice(
      0,
      Math.ceil(techs.length / 2)
    );
  }

  getSecondRow(techs: string[]) {
    return techs.slice(
      Math.ceil(techs.length / 2)
    );
  }

  toggleAll(): void {

    this.showAll = !this.showAll;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'projects_show_all',
        String(this.showAll)
      );
    }

    requestAnimationFrame(() => {

      this.killMarquees();

      this.revealObserver?.disconnect();

      this.setupMarquees();

      this.setupRevealAnimations();
    });
  }

  // ─── Custom cursor handlers ───────────────────────

  onImgEnter(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const img = e.currentTarget as HTMLElement;
    const cursor = img.querySelector('.project-cursor') as HTMLElement;
    if (!cursor) return;
    cursor.classList.add('visible');
  }

  onImgLeave(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const img = e.currentTarget as HTMLElement;
    const cursor = img.querySelector('.project-cursor') as HTMLElement;
    if (!cursor) return;
    cursor.classList.remove('visible');
  }

  onImgMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const img = e.currentTarget as HTMLElement;
    const cursor = img.querySelector('.project-cursor') as HTMLElement;
    if (!cursor) return;
    const rect = img.getBoundingClientRect();
    cursor.style.left = `${e.clientX - rect.left}px`;
    cursor.style.top  = `${e.clientY - rect.top}px`;
  }

  // ─────────────────────────────────────────────────

  private killMarquees(): void {

    this.tweens.forEach(tween => tween.kill());

    this.tweens = [];

    this.observer?.disconnect();

    this.observer = null;
  }

  private setupMarquees(): void {

    if (window.innerWidth > 600) return;

    const section =
      document.querySelector('.projects-section');

    if (!section) return;

    this.observer = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          this.tweens.forEach(tween => {

            if (entry.isIntersecting) {
              tween.resume();
            } else {
              tween.pause();
            }

          });

        });

      },
      {
        threshold: 0
      }
    );

    this.observer.observe(section);

    this.initMarquee(
      '.row-1 .tech-track',
      -1
    );

    this.initMarquee(
      '.row-2 .tech-track',
      1
    );
  }

  private initMarquee(
    selector: string,
    direction: number
  ): void {

    const tracks =
      document.querySelectorAll(selector);

    tracks.forEach((trackEl) => {

      const track = trackEl as HTMLElement;

      const distance = track.scrollWidth / 2;

      const tween = gsap.fromTo(
        track,
        {
          x: direction === -1
            ? 0
            : -distance
        },
        {
          x: direction === -1
            ? -distance
            : 0,

          duration: 20,

          ease: 'none',

          repeat: -1,

          force3D: true
        }
      );

      this.tweens.push(tween);

    });
  }


  private setupRevealAnimations(): void {

    const header =
      document.querySelector('.section-header');

    if (header) {

      const headerChildren =
        Array.from(header.children) as HTMLElement[];

      RevealAnimations.revealText(headerChildren);

    }

    const cards =
      document.querySelectorAll('.project-item');

    this.revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const card =
              entry.target as HTMLElement;

            const imageWrapper =
              card.querySelector('.project-img');

            const texts =
              card.querySelectorAll(
                `
                .name,
                .row2,
                .row3,
                .project-techs,
                .project-techs-mobile,
                .project-links
                `
              );

            if (imageWrapper) {

              RevealAnimations.revealImage(
                imageWrapper
              );

            }

            RevealAnimations.bounceReveal(
              texts,
              0.25
            );

            this.revealObserver?.unobserve(card);

          });

        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -10% 0px'
        }
      );

    cards.forEach(card => {

      this.revealObserver?.observe(card);

    });
  }
}