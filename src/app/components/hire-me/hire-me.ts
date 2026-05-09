import {
  Component,
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

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-hire-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hire-me.html',
  styleUrl: './hire-me.scss',
})
export class HireMe implements AfterViewInit {

  @ViewChild('section')
  sectionRef!: ElementRef<HTMLElement>;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {}

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    const section =
      this.sectionRef.nativeElement;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      }
    });

    tl.from('.hire-me__eyebrow', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    .from('.hire-me__title', {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=.2')

    .from('.hire-me__description', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=.35')

    .from('.hire-me__cta', {
      y: 20,
      opacity: 0,
      scale: .95,
      duration: 0.45,
      ease: 'power2.out',
    }, '-=.2');

  }

}