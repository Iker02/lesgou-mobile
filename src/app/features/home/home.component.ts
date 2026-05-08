import { Component, signal } from '@angular/core';
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
export class HomeComponent {
  mode = signal<AppMode>('normal');

  // Mock stats — later estos vendrán de un servicio
  stats = {
    streak: 12,
    points: 847,
    sessions: 38,
    bestStreak: 18,
  };

  navItems = [
    { icon: 'ti-home', active: true },
    { icon: 'ti-chart-bar', active: false },
    { icon: 'ti-trophy', active: false },
    { icon: 'ti-user', active: false },
  ];

  constructor(private router: Router) {}

  setMode(m: AppMode) {
    this.mode.set(m);
  }

  startWorkout() {
    // Navegará a /workout cuando lo creemos
    this.router.navigate(['/workout']);
  }
}
