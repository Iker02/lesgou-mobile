export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyParts: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
  equipments: string[];
  instructions: string[];
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: string; // ej: "8-10" o "12"
  restSeconds: number;
  completed?: boolean;
}
