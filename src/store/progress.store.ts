// store/progress.store.ts
import { create } from "zustand";

type ProgressEntry = {
  date: string;
  weight: number;
};

type ProgressStore = {
  progress: ProgressEntry[];
  addEntry: (weight: number) => void;
  reset: () => void;
};

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: JSON.parse(localStorage.getItem("progress") || "[]"),

  addEntry: (weight) =>
    set((state) => {
      const updated = [
        ...state.progress,
        { weight, date: new Date().toISOString().split("T")[0] },
      ];
      localStorage.setItem("progress", JSON.stringify(updated));
      return { progress: updated };
    }),

  reset: () => {
    localStorage.removeItem("progress");
    return { progress: [] };
  },
}));
