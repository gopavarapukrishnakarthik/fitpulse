import { create } from "zustand";

export type Workout = {
  id: string;
  name: string;
  exercises: string[];
};

type WorkoutStore = {
  workouts: Workout[];
  addWorkout: (name: string) => void;
  removeWorkout: (id: string) => void;
  addExercise: (workoutId: string, exercise: string) => void;
  removeExercise: (workoutId: string, exercise: string) => void;
  reset: () => void;
};

const STORAGE_KEY = "workouts";

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),

  addWorkout: (name) =>
    set((state) => {
      const updated = [
        ...state.workouts,
        {
          id: crypto.randomUUID(),
          name,
          exercises: [],
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { workouts: updated };
    }),

  removeWorkout: (id) =>
    set((state) => {
      const updated = state.workouts.filter((w) => w.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { workouts: updated };
    }),

  addExercise: (workoutId, exercise) =>
    set((state) => {
      const updated = state.workouts.map((w) =>
        w.id === workoutId
          ? { ...w, exercises: [...w.exercises, exercise] }
          : w
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { workouts: updated };
    }),

  removeExercise: (workoutId, exercise) =>
    set((state) => {
      const updated = state.workouts.map((w) =>
        w.id === workoutId
          ? {
              ...w,
              exercises: w.exercises.filter((e) => e !== exercise),
            }
          : w
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { workouts: updated };
    }),

  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    return { workouts: [] };
  },
}));
