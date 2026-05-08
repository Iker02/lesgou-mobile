import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutTemplate } from '../../../core/models/workout';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss',
})
export class TemplateListComponent {
  constructor(
    public workoutService: WorkoutService,
    private router: Router,
  ) {}

  selectTemplate(template: WorkoutTemplate) {
    this.router.navigate(['/workout/detail', template.id]);
  }
}
