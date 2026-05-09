import { Component, HostListener, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OWNER, NAV_LINKS } from '../../constants/portfolio.constants';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  owner = OWNER;
  navLinks = NAV_LINKS;

  isScrolled = signal(false);
  menuOpen = signal(false);
  showBrand = signal(false);

  navbarHidden = signal(false);

  private lastScrollY = 0;

  @HostListener('window:scroll')
  onScroll() {
    const currentY = window.scrollY;

    this.isScrolled.set(currentY > 20);
    this.showBrand.set(currentY > 80);

    if (currentY < 80) {
      this.navbarHidden.set(false);
    } else {
      const scrollingDown = currentY > this.lastScrollY;
      this.navbarHidden.set(scrollingDown && !this.menuOpen());
    }

    this.lastScrollY = currentY;
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);

    this.navbarHidden.set(false);
  }

  scrollTo(anchor: string) {
    const el = document.querySelector(anchor);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    this.menuOpen.set(false);
  }

  openResume() {
    window.open('/resume', '_blank');
  }
}
