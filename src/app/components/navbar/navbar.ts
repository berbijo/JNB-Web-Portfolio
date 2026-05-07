import { Component, HostListener, signal } from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { OWNER, NAV_LINKS }               from '../../constants/portfolio.constants';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  owner    = OWNER;
  navLinks = NAV_LINKS;
 
  isScrolled   = signal(false);
  menuOpen     = signal(false);
  showBrand    = signal(false); // brand name hidden on hero, shows after scroll
 
  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    this.isScrolled.set(y > 20);
    this.showBrand.set(y > 80);
  }
 
  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
 
  scrollTo(anchor: string) {
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen.set(false);
  }
}
