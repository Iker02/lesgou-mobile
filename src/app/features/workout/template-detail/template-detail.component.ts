import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutExercise } from '../../../core/models/exercise';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-detail.component.html',
  styleUrl: './template-detail.component.scss',
})
export class TemplateDetailComponent {
  templateId = signal<string>('');

  template = computed(() =>
    this.workoutService.templates().find((t) => t.id === this.templateId()),
  );

  constructor(
    public workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.templateId.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  removeExercise(exercise: WorkoutExercise) {
    this.workoutService.removeExerciseFromTemplate(
      this.templateId(),
      exercise.exercise.id,
    );
  }

  openSearch() {
    this.router.navigate(['/workout/search', this.templateId()]);
  }

  startWorkout() {
    const t = this.template();
    if (!t) return;
    this.workoutService.startSession(t);
    this.router.navigate(['/workout/active']);
  }

  goBack() {
    this.router.navigate(['/workout']);
  }
}
