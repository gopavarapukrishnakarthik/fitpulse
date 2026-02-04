// Collect all available images from all categories into one pool
const allImages = [
  '/Images/Abs/pexels-ivan-s-4162553.jpg',
  '/Images/Abs/pexels-ketut-subiyanto-4720815.jpg',
  '/Images/Abs/pexels-koolshooters-8544616.jpg',
  '/Images/Abs/pexels-niko-twisty-13993595.jpg',
  '/Images/Abs/pexels-pixabay-416778.jpg',
  '/Images/Arms/pexels-andrii-10152554.jpg',
  '/Images/Arms/pexels-cesar-galeao-1673528-3253515.jpg',
  '/Images/Arms/pexels-olly-3838389.jpg',
  '/Images/Arms/pexels-tima-miroshnichenko-5327465.jpg',
  '/Images/Arms/pexels-wolrider-17626051.jpg',
  '/Images/Arms/pexels-zain-alabdeen-hammoudi-2151566197-33589377.jpg',
  '/Images/Back/pexels-alejandro-aznar-155337093-20873830.jpg',
  '/Images/Back/pexels-marcuschanmedia-18060190.jpg',
  '/Images/Cardio/pexels-823sl-2294360.jpg',
  '/Images/Cardio/pexels-anastasia-shuraeva-4944954.jpg',
  '/Images/Cardio/pexels-anastasia-shuraeva-4944976.jpg',
  '/Images/Cardio/pexels-ketut-subiyanto-4853865.jpg',
  '/Images/Cardio/pexels-pavel-danilyuk-6339341.jpg',
  '/Images/Chest/pexels-alesiakozik-7289250.jpg',
  '/Images/Chest/pexels-fire-flintq8-1049543416-20418607.jpg',
  '/Images/Legs/pexels-indigentesce-9152547.jpg',
  '/Images/Legs/pexels-scottwebb-136404.jpg',
  '/Images/Shoulders/pexels-alesiakozik-7289367.jpg',
  '/Images/Shoulders/pexels-foadshariyati-29773898.jpg',
  '/Images/Shoulders/pexels-foadshariyati-29850899.jpg',
  '/Images/Shoulders/pexels-foadshariyati-29850908.jpg',
  '/Images/Shoulders/pexels-marcuschanmedia-18060019.jpg',
];

// Category-specific image mapping for better relevance
const categoryImageMap: Record<string, string[]> = {
  Abs: [
    '/Images/Abs/pexels-ivan-s-4162553.jpg',
    '/Images/Abs/pexels-ketut-subiyanto-4720815.jpg',
    '/Images/Abs/pexels-koolshooters-8544616.jpg',
    '/Images/Abs/pexels-niko-twisty-13993595.jpg',
    '/Images/Abs/pexels-pixabay-416778.jpg',
  ],
  Arms: [
    '/Images/Arms/pexels-andrii-10152554.jpg',
    '/Images/Arms/pexels-cesar-galeao-1673528-3253515.jpg',
    '/Images/Arms/pexels-olly-3838389.jpg',
    '/Images/Arms/pexels-tima-miroshnichenko-5327465.jpg',
    '/Images/Arms/pexels-wolrider-17626051.jpg',
    '/Images/Arms/pexels-zain-alabdeen-hammoudi-2151566197-33589377.jpg',
  ],
  Back: [
    '/Images/Back/pexels-alejandro-aznar-155337093-20873830.jpg',
    '/Images/Back/pexels-marcuschanmedia-18060190.jpg',
  ],
  Cardio: [
    '/Images/Cardio/pexels-823sl-2294360.jpg',
    '/Images/Cardio/pexels-anastasia-shuraeva-4944954.jpg',
    '/Images/Cardio/pexels-anastasia-shuraeva-4944976.jpg',
    '/Images/Cardio/pexels-ketut-subiyanto-4853865.jpg',
    '/Images/Cardio/pexels-pavel-danilyuk-6339341.jpg',
  ],
  Chest: [
    '/Images/Chest/pexels-alesiakozik-7289250.jpg',
    '/Images/Chest/pexels-fire-flintq8-1049543416-20418607.jpg',
  ],
  Legs: [
    '/Images/Legs/pexels-indigentesce-9152547.jpg',
    '/Images/Legs/pexels-scottwebb-136404.jpg',
  ],
  Shoulders: [
    '/Images/Shoulders/pexels-alesiakozik-7289367.jpg',
    '/Images/Shoulders/pexels-foadshariyati-29773898.jpg',
    '/Images/Shoulders/pexels-foadshariyati-29850899.jpg',
    '/Images/Shoulders/pexels-foadshariyati-29850908.jpg',
    '/Images/Shoulders/pexels-marcuschanmedia-18060019.jpg',
  ],
};

// Track used images to prevent repetition
const usedImages = new Set<string>();
let lastUsedImage: string | null = null;

// Shuffle array utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get an exercise image ensuring no consecutive repetition
 * @param categoryName - The category name (e.g., "Abs", "Arms", "Chest")
 * @param exerciseId - The exercise ID for consistency
 * @returns Path to a unique image
 */
export const getExerciseImage = (
  categoryName?: string | null,
  exerciseId?: string | number
): string => {
  // Normalize category name
  const normalizedCategory = categoryName ? normalizeCategoryName(categoryName) : null;
  
  // Get category-specific images or all images
  let availableImages = normalizedCategory && categoryImageMap[normalizedCategory]
    ? [...categoryImageMap[normalizedCategory]]
    : [...allImages];

  // Filter out the last used image to prevent consecutive repetition
  if (lastUsedImage) {
    availableImages = availableImages.filter(img => img !== lastUsedImage);
  }

  // If all images in category were used, reset and use all again (except last)
  if (usedImages.size >= allImages.length - 1) {
    usedImages.clear();
  }

  // Filter out recently used images
  let unusedImages = availableImages.filter(img => !usedImages.has(img));
  
  // If no unused images available in this category, use all category images (except last)
  if (unusedImages.length === 0) {
    unusedImages = availableImages;
  }

  // Shuffle and pick one
  const shuffled = shuffleArray(unusedImages);
  const selectedImage = shuffled[0] || allImages[0];

  // Track usage
  usedImages.add(selectedImage);
  lastUsedImage = selectedImage;

  return selectedImage;
};

/**
 * Reset image tracking (useful when loading new exercise set)
 */
export const resetImageTracking = () => {
  usedImages.clear();
  lastUsedImage = null;
};

/**
 * Normalize category names to match folder structure
 */
function normalizeCategoryName(category: string): string {
  const normalized = category.toLowerCase().trim();

  const categoryMap: Record<string, string> = {
    'abs': 'Abs',
    'abdominals': 'Abs',
    'core': 'Abs',
    'arms': 'Arms',
    'biceps': 'Arms',
    'triceps': 'Arms',
    'forearms': 'Arms',
    'back': 'Back',
    'lats': 'Back',
    'lower back': 'Back',
    'cardio': 'Cardio',
    'cardiovascular': 'Cardio',
    'chest': 'Chest',
    'pectorals': 'Chest',
    'pecs': 'Chest',
    'legs': 'Legs',
    'quads': 'Legs',
    'hamstrings': 'Legs',
    'calves': 'Legs',
    'glutes': 'Legs',
    'shoulders': 'Shoulders',
    'delts': 'Shoulders',
    'deltoids': 'Shoulders',
  };

  return categoryMap[normalized] || 'Cardio';
}

/**
 * Get all images for a specific category
 */
export const getCategoryImages = (categoryName: string): string[] => {
  const normalized = normalizeCategoryName(categoryName);
  return categoryImageMap[normalized] || [];
};
