import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OWNER, FOOTER_LINKS } from '../../constants/portfolio.constants';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  owner = OWNER;
  footerLinks = FOOTER_LINKS;
  year = new Date().getFullYear();

  scrollTo(anchor: string) {
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
