// utils/calculations.ts

export const calculateBMI = (weightKg: number, heightCm: number) => {
  const heightM = heightCm / 100;
  return +(weightKg / (heightM * heightM)).toFixed(1);
};

export const calculateBMR = (
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female"
) => {
  // Mifflin-St Jeor Equation
  return gender === "male"
    ? Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5)
    : Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
};

export const calculateTDEE = (
  bmr: number,
  activityLevel:
    | "sedentary"
    | "light"
    | "moderate"
    | "active"
    | "very_active"
) => {
  const multiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return Math.round(bmr * multiplier[activityLevel]);
};
