import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/exercise';

const BASE_URL = 'https://oss.exercisedb.dev/api/v1';

const BODY_PART_MAP: Record<string, string> = {
  chest: 'Pecho',
  back: 'Espalda',
  shoulders: 'Hombros',
  'upper legs': 'Pierna',
  'lower legs': 'Pantorrilla',
  'upper arms': 'Brazos',
  'lower arms': 'Antebrazo',
  waist: 'Abdomen',
  cardio: 'Cardio',
};

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  exercises = signal<Exercise[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  searchByBodyPart(bodyPart: string) {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Exercise[]>(`${BASE_URL}/exercises/bodyPart/${bodyPart}?limit=20`)
      .subscribe({
        next: (data) => {
          this.exercises.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los ejercicios');
          this.loading.set(false);
        },
      });
  }

  searchByName(query: string) {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Exercise[]>(`${BASE_URL}/exercises/name/${query}?limit=20`)
      .subscribe({
        next: (data) => {
          this.exercises.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los ejercicios');
          this.loading.set(false);
        },
      });
  }

  getBodyPartLabel(bodyPart: string): string {
    return BODY_PART_MAP[bodyPart] ?? bodyPart;
  }
}
