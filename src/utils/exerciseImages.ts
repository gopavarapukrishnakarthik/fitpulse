const imageCache = new Map<string, string>();

export function resetImageTracking() {
  imageCache.clear();
}

export function getExerciseImage(
  category?: string,
  exerciseId?: string | number
): string {
  const key = `${category ?? "default"}-${exerciseId ?? "fallback"}`;

  if (imageCache.has(key)) {
    return imageCache.get(key)!;
  }

  const base = "/fitpulse/Images";

  const folders: Record<string, string[]> = {
    Abs: [
      "Abs/pexels-ivan-s-4162553.jpg",
      "Abs/pexels-ketut-subiyanto-4720815.jpg",
      "Abs/pexels-koolshooters-8544616.jpg",
      "Abs/pexels-niko-twisty-13993595.jpg",
      "Abs/pexels-pixabay-416778.jpg",
    ],
    Arms: [
      "Arms/pexels-andrii-10152554.jpg",
      "Arms/pexels-cesar-galeao-1673528-3253515.jpg",
      "Arms/pexels-olly-3838389.jpg",
      "Arms/pexels-tima-miroshnichenko-5327465.jpg",
      "Arms/pexels-wolrider-17626051.jpg",
      "Arms/pexels-zain-alabdeen-hammoudi-2151566197-33589377.jpg",
    ],
    Back: [
      "Back/pexels-alejandro-aznar-155337093-20873830.jpg",
      "Back/pexels-marcuschanmedia-18060190.jpg",
    ],
    Cardio: [
      "Cardio/pexels-823sl-2294360.jpg",
      "Cardio/pexels-anastasia-shuraeva-4944954.jpg",
      "Cardio/pexels-anastasia-shuraeva-4944976.jpg",
      "Cardio/pexels-ketut-subiyanto-4853865.jpg",
      "Cardio/pexels-pavel-danilyuk-6339341.jpg",
    ],
    Chest: [
      "Chest/pexels-alesiakozik-7289250.jpg",
      "Chest/pexels-fire-flintq-1049543416-20418607.jpg",
    ],
    Legs: [
      "Legs/pexels-indigentesce-9152547.jpg",
      "Legs/pexels-scottwebb-136404.jpg",
    ],
    Shoulders: [
      "Shoulders/pexels-alesiakozik-7289367.jpg",
      "Shoulders/pexels-foadshariyati-29773898.jpg",
      "Shoulders/pexels-foadshariyati-29850899.jpg",
      "Shoulders/pexels-foadshariyati-29850908.jpg",
      "Shoulders/pexels-marcuschanmedia-18060019.jpg",
    ],
    default: [
      "Cardio/pexels-823sl-2294360.jpg",
    ],
  };

  const images = folders[category ?? "default"] ?? folders.default;
  const selected =
    images[Math.abs(hash(String(exerciseId))) % images.length];

  const finalPath = `${base}/${selected}`;
  imageCache.set(key, finalPath);

  return finalPath;
}

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return h;
}