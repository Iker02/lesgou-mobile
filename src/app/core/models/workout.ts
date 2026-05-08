import { WorkoutExercise } from './exercise';

export interface WorkoutTemplate {
  id: string;
  name: string;
  emoji: string;
  exercises: WorkoutExercise[];
  estimatedMinutes: number;
  isCustom?: boolean;
}

export interface WorkoutSession {
  id: string;
  templateId: string;
  templateName: string;
  startedAt: Date;
  finishedAt?: Date;
  exercises: WorkoutExercise[];
  currentExerciseIndex: number;
  currentSet: number;
}
