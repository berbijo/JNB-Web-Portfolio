import {
  Component,
  signal,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink }                       from '@angular/router';
import { PROJECTS, Project }                from '../../constants/portfolio.constants';
import { gsap }                             from 'gsap';
import { ScrollTrigger }                    from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {

  @ViewChild('previewImage')   previewImageRef!:   ElementRef<HTMLImageElement>;
  @ViewChild('previewOverlay') previewOverlayRef!: ElementRef<HTMLDivElement>;
  @ViewChild('projectsSection') sectionRef!:       ElementRef<HTMLElement>;
  @ViewChild('eyebrowRef')     eyebrowRef!:        ElementRef<HTMLElement>;
  @ViewChildren('projectItem') projectItems!:      QueryList<ElementRef<HTMLElement>>;

  projects      = PROJECTS;
  activeProject = signal<Project>(PROJECTS[0]);

  private ctx: gsap.Context | null = null;

  private loadHandler: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.animatePreviewIn();
    }, 50);

    gsap.registerPlugin(ScrollTrigger);

    requestAnimationFrame(() => {
      const section = this.sectionRef?.nativeElement;
      if (!section) return;

      const rect      = section.getBoundingClientRect();
      const alreadyIn = rect.top < window.innerHeight * 0.85 || rect.bottom <= 0;
      if (alreadyIn) return;

      this.ctx = gsap.context(() => {

        if (this.eyebrowRef?.nativeElement) {
          gsap.from(this.eyebrowRef.nativeElement, {
            x: -50,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: this.eyebrowRef.nativeElement,
              start: 'top 85%',
              once: true,
            },
          });
        }

        const items = this.projectItems?.toArray();

        if (items?.length) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          });

          items.forEach((ref, i) => {
            tl.from(
              ref.nativeElement,
              {
                y: 22,
                opacity: 0,
                duration: 0.55,
                ease: 'power3.out',
              },
              i * 0.07,
            );
          });
        }

        const previewCard = section.querySelector('.projects__preview-card');

        if (previewCard) {
          gsap.from(previewCard, {
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          });
        }

      }, section);

      ScrollTrigger.refresh(true);
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
    this.clearLoadHandler();
  }

  selectProject(project: Project) {

    if (this.activeProject().id === project.id) return;

  // disable heavy animation on small screens
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    this.activeProject.set(project);
    return;
  }

    const image   = this.previewImageRef?.nativeElement;
    const overlay = this.previewOverlayRef?.nativeElement;

    gsap.killTweensOf([image, overlay]);
    this.clearLoadHandler();

    gsap.timeline({
      defaults: {
        overwrite: 'auto',
      },

      onComplete: () => {

        this.activeProject.set(project);

        requestAnimationFrame(() => {

          const img = this.previewImageRef?.nativeElement;

          if (!img) return;

          if (img.complete && img.naturalWidth > 0) {

            this.animatePreviewIn();

          } else {

            gsap.set(img, {
              opacity: 0,
              scale: 1.04,
            });

            this.loadHandler = () => {
              this.animatePreviewIn();
              this.clearLoadHandler();
            };

            img.addEventListener('load', this.loadHandler, { once: true });
          }

        });

      },
    })
    .to(image, {
      scale: 1.06,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.out',
      force3D: true,
    })
    .to(overlay, {
      opacity: 0,
      duration: 0.18,
      ease: 'power2.out',
    }, 0);
  }

  private animatePreviewIn() {

    const image   = this.previewImageRef?.nativeElement;
    const overlay = this.previewOverlayRef?.nativeElement;

    if (!image) return;

    gsap.fromTo(
      image,
      {
        scale: 1.04,
        opacity: 0,
        force3D: true,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        force3D: true,
      },
    );

    if (overlay) {
      gsap.fromTo(
        overlay,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay: 0.05,
          ease: 'power2.out',
        },
      );
    }
  }

  private clearLoadHandler() {
    if (this.loadHandler) {
      const img = this.previewImageRef?.nativeElement;

      img?.removeEventListener('load', this.loadHandler);

      this.loadHandler = null;
    }
  }
}