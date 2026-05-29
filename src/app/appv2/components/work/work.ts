import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import gsap from 'gsap';
import { EXPERIENCE } from '../../../constants/portfolio.constants';


@Component({
  selector: 'app-work',
  imports: [],
  templateUrl: './work.html',
  styleUrl: './work.scss',
})
export class Work implements AfterViewInit {

  exp = EXPERIENCE;
  Math = Math;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getFirstRow(techs: string[]) {
    return techs.slice(0, Math.ceil(techs.length / 2));
  }

  getSecondRow(techs: string[]) {
    return techs.slice(Math.ceil(techs.length / 2));
  }

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    if (window.innerWidth > 600) return;

    this.initMarquee('.row-1 .tech-track', -1);
    this.initMarquee('.row-2 .tech-track', 1);
  }

  initMarquee(selector: string, direction: number) {

    const tracks = document.querySelectorAll(selector);

    tracks.forEach((trackEl) => {

      const track = trackEl as HTMLElement;

      const distance = track.scrollWidth / 2;

      gsap.fromTo(
        track,
        {
          x: direction === -1 ? 0 : -distance,
        },
        {
          x: direction === -1 ? -distance : 0,
          duration: 20,
          ease: 'none',
          repeat: -1,
        }
      );

    });
  }
}