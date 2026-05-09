import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { APP_INITIALIZER, PLATFORM_ID, inject } from '@angular/core';

import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import { routes } from './app.routes';
import { createLenis } from '../smooth-scroll';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(

      routes,

      withInMemoryScrolling({

        anchorScrolling: 'enabled',

        scrollPositionRestoration: 'enabled',

      })

    ),

    provideClientHydration(
      withEventReplay()
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return createLenis(platformId);
      },
      multi: true,
    }

  ]

};