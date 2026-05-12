import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export type AppMode = 'normal' | 'cabron';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('btnWrap') btnWrap!: ElementRef<HTMLDivElement>;
  @ViewChild('btn3d') btn3d!: ElementRef<HTMLDivElement>;
  @ViewChild('btnFace') btnFace!: ElementRef<HTMLDivElement>;

  mode = signal<AppMode>('normal');

  stats = { streak: 12, points: 847, sessions: 38, bestStreak: 18 };
  navItems = [
    { icon: 'ti-home', active: true },
    { icon: 'ti-chart-bar', active: false },
    { icon: 'ti-trophy', active: false },
    { icon: 'ti-user', active: false },
  ];

  private pressed = false;
  private pulseRaf = 0;
  private pulseT = 0;
  private listeners: Array<{
    el: HTMLElement | Window;
    ev: string;
    fn: EventListener;
  }> = [];

  constructor(
    private router: Router,
    private zone: NgZone,
  ) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => this.initButton());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.pulseRaf);
    this.listeners.forEach(({ el, ev, fn }) => el.removeEventListener(ev, fn));
  }

  private initButton() {
    const wrap = this.btnWrap.nativeElement;
    const btn = this.btn3d.nativeElement;

    const onMouseMove = (e: MouseEvent) => {
      if (this.pressed) return;
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      btn.style.transform = `rotateX(${-dy * 18}deg) rotateY(${dx * 18}deg)`;
    };

    const onMouseLeave = () => {
      if (!this.pressed) btn.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    const onMouseDown = () => {
      this.pressed = true;
      wrap.classList.add('btn-pressed');
      btn.style.transform = 'rotateX(8deg) rotateY(0deg) scale(0.97)';
    };

    const onMouseUp = () => {
      if (!this.pressed) return;
      this.pressed = false;
      wrap.classList.remove('btn-pressed');
      btn.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      this.pressed = true;
      wrap.classList.add('btn-pressed');
      btn.style.transform = 'rotateX(8deg) rotateY(0deg) scale(0.97)';
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      this.pressed = false;
      wrap.classList.remove('btn-pressed');
      btn.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      // Navegación manual en touch
      this.zone.run(() => this.startWorkout());
    };

    wrap.addEventListener('mousemove', onMouseMove as EventListener);
    wrap.addEventListener('mouseleave', onMouseLeave as EventListener);
    wrap.addEventListener('mousedown', onMouseDown as EventListener);
    wrap.addEventListener('touchstart', onTouchStart as EventListener, {
      passive: false,
    });
    wrap.addEventListener('touchend', onTouchEnd as EventListener);
    window.addEventListener('mouseup', onMouseUp as EventListener);

    this.listeners = [
      { el: wrap, ev: 'mousemove', fn: onMouseMove as EventListener },
      { el: wrap, ev: 'mouseleave', fn: onMouseLeave as EventListener },
      { el: wrap, ev: 'mousedown', fn: onMouseDown as EventListener },
      { el: wrap, ev: 'touchstart', fn: onTouchStart as EventListener },
      { el: wrap, ev: 'touchend', fn: onTouchEnd as EventListener },
      { el: window, ev: 'mouseup', fn: onMouseUp as EventListener },
    ];

    const tick = () => {
      if (!this.pressed) {
        this.pulseT += 0.02;
        const s = 1 + Math.sin(this.pulseT) * 0.015;
        btn.style.transform = `rotateX(0deg) rotateY(0deg) scale(${s})`;
      }
      this.pulseRaf = requestAnimationFrame(tick);
    };
    tick();
  }

  setMode(m: AppMode) {
    this.mode.set(m);
  }

  startWorkout() {
    this.router.navigate(['/workout']);
  }
}
