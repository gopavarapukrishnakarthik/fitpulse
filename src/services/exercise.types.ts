export type WgerTranslation = {
  id: number;
  language: number; // 2 = English
  description: string;
};

export type WgerCategory = {
  id: number;
  name: string;
};

export type WgerEquipment = {
  id: number;
  name: string;
};

export type WgerExercise = {
  id: number;
  name: string;
  translations: WgerTranslation[];
  category?: WgerCategory | null;
  equipment?: WgerEquipment[];
};
