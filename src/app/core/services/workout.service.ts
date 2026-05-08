import { Injectable, signal } from '@angular/core';
import { WorkoutTemplate, WorkoutSession } from '../models/workout';
import { WorkoutExercise } from '../models/exercise';
import { StorageService } from './storage.service';
import { DEFAULT_TEMPLATES } from '../data/default-templates';

const STORAGE_KEY = 'lesgou_templates';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  templates = signal<WorkoutTemplate[]>([]);
  activeSession = signal<WorkoutSession | null>(null);

  constructor(private storage: StorageService) {
    this.loadTemplates();
  }

  async loadTemplates() {
    const saved = await this.storage.get<WorkoutTemplate[]>(STORAGE_KEY);
    this.templates.set(saved ?? DEFAULT_TEMPLATES);
  }

  async saveTemplates() {
    await this.storage.set(STORAGE_KEY, this.templates());
  }

  async addExerciseToTemplate(templateId: string, exercise: WorkoutExercise) {
    const updated = this.templates().map((t) =>
      t.id === templateId ? { ...t, exercises: [...t.exercises, exercise] } : t,
    );
    this.templates.set(updated);
    await this.saveTemplates();
  }

  async removeExerciseFromTemplate(templateId: string, exerciseId: string) {
    const updated = this.templates().map((t) =>
      t.id === templateId
        ? {
            ...t,
            exercises: t.exercises.filter((e) => e.exercise.id !== exerciseId),
          }
        : t,
    );
    this.templates.set(updated);
    await this.saveTemplates();
  }

  startSession(template: WorkoutTemplate): WorkoutSession {
    const session: WorkoutSession = {
      id: Date.now().toString(),
      templateId: template.id,
      templateName: template.name,
      startedAt: new Date(),
      exercises: [...template.exercises],
      currentExerciseIndex: 0,
      currentSet: 1,
    };
    this.activeSession.set(session);
    return session;
  }
}
