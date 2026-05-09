import {
  Component,
  signal,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  PROJECTS,
  Project
} from '../../constants/portfolio.constants';

import { gsap } from 'gsap';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})

export class Projects implements AfterViewInit {

  @ViewChild('previewImage')
  previewImageRef!: ElementRef<HTMLImageElement>;

  @ViewChild('previewOverlay')
  previewOverlayRef!: ElementRef<HTMLDivElement>;

  projects = PROJECTS;

  activeProject =
    signal<Project>(PROJECTS[0]);

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {}

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    this.animatePreviewIn();

  }

  selectProject(project: Project) {

    if (this.activeProject().id === project.id) return;

    const image =
      this.previewImageRef?.nativeElement;

    const overlay =
      this.previewOverlayRef?.nativeElement;

    /* ── Animate current preview out ── */
    gsap.timeline({

      onComplete: () => {

        this.activeProject.set(project);

        requestAnimationFrame(() => {
          this.animatePreviewIn();
        });

      }

    })
    .to(image, {
      scale: 1.12,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    })
    .to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    }, 0);

  }

  private animatePreviewIn() {

    const image =
      this.previewImageRef?.nativeElement;

    const overlay =
      this.previewOverlayRef?.nativeElement;

    if (!image) return;

    gsap.fromTo(
      image,

      {
        scale: 1.18,
        opacity: 0,
      },

      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
      }
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
          duration: 0.6,
          delay: 0.1,
          ease: 'power3.out',
        }
      );

    }

  }

}