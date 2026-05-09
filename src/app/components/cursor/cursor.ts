import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
  signal,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.html',
  styleUrl: './cursor.scss',
})
export class Cursor implements OnDestroy {
  @ViewChild('dot') dot!: ElementRef<HTMLDivElement>;
  @ViewChild('ring') ring!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private readonly LERP = 0.09;

  isVisible = signal(false);
  isClicking = signal(false);
  isHovering = signal(false);

  private rafId: number | null = null;

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (!this.isVisible()) this.isVisible.set(true);
  };
  private onMouseLeave = () => this.isVisible.set(false);
  private onMouseEnter = () => this.isVisible.set(true);
  private onMouseDown = () => this.isClicking.set(true);
  private onMouseUp = () => this.isClicking.set(false);
  private onOver = (e: MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, label, select, textarea',
      )
    )
      this.ngZone.run(() => this.isHovering.set(true));
  };
  private onOut = (e: MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, label, select, textarea',
      )
    )
      this.ngZone.run(() => this.isHovering.set(false));
  };

  constructor() {
    afterNextRender(() => {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseleave', this.onMouseLeave);
      document.addEventListener('mouseenter', this.onMouseEnter);
      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mouseover', this.onOver);
      document.addEventListener('mouseout', this.onOut);

      this.ngZone.runOutsideAngular(() => this.tick());
    });
  }

  ngOnDestroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseleave', this.onMouseLeave);
      document.removeEventListener('mouseenter', this.onMouseEnter);
      document.removeEventListener('mousedown', this.onMouseDown);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mouseover', this.onOver);
      document.removeEventListener('mouseout', this.onOut);
    }
  }

  private tick = () => {
    this.ringX += (this.mouseX - this.ringX) * this.LERP;
    this.ringY += (this.mouseY - this.ringY) * this.LERP;

    if (this.dot?.nativeElement)
      this.dot.nativeElement.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;

    if (this.ring?.nativeElement)
      this.ring.nativeElement.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;

    this.rafId = requestAnimationFrame(this.tick);
  };
}
