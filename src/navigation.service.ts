import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  private lastUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {

        this.lastUrl = this.currentUrl;
        this.currentUrl = e.urlAfterRedirects;

      });

  }

  isBackNavigation(): boolean {
    return false; // we don’t rely on guessing anymore
  }

  cameFrom(url: string): boolean {
    return this.lastUrl === url;
  }
}