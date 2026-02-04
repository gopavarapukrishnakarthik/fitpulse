import api from "@/lib/axios";
import type { WgerExercise }  from "./exercise.types"; // or same file

export const getExercises = async (
  limit = 20,
  offset = 0
): Promise<WgerExercise[]> => {
  try {
    const res = await api.get("/exerciseinfo/", {
      params: { limit, offset },
    });

    return res.data.results;
  } catch (error) {
    console.error("Failed to fetch exercises", error);
    return [];
  }
};
