import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimationStateService {

  private heroPlayed = false;

  setHeroPlayed() {
    this.heroPlayed = true;
  }

  shouldPlayHero(): boolean {
    return !this.heroPlayed;
  }
}