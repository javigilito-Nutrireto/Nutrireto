export type SubscriptionPlan = 'free' | 'standard' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  allergies: Allergy[];
  preferences: string[];
  goal: NutritionalGoal;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiry?: Date;
}

export type Allergy = 'gluten' | 'lactose' | 'nuts' | 'seafood' | 'eggs' | 'soy';

export type NutritionalGoal = 'lose_weight' | 'maintain' | 'gain_muscle';

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  image: string;
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number; // g
    carbs: number; // g
    fat: number; // g
  };
  tags: MealTag[];
  allergens: Allergy[];
}

export type MealTag = 'gluten_free' | 'vegan' | 'vegetarian' | 'high_protein' | 'low_carb' | 'keto' | 'mediterranean';

export interface DailyMeals {
  date: string;
  meals: Meal[];
  maxMeals: number;
}

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  price: number;
  mealsPerDay: number;
  features: string[];
}

export interface AIMenuRequest {
  userId: string;
  preferences: string[];
  allergies: Allergy[];
  goal: NutritionalGoal;
  mealsCount: number;
  previousMeals?: string[];
}

export interface AIMenuResponse {
  meals: Meal[];
  totalTokens: number;
  cost: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppSettings {
  theme: ThemeMode;
  notifications: {
    mealReminders: boolean;
    promotions: boolean;
    weeklyReports: boolean;
  };
  language: 'es' | 'en';
}

export interface NotificationSettings {
  breakfast: { enabled: boolean; time: string };
  lunch: { enabled: boolean; time: string };
  dinner: { enabled: boolean; time: string };
  promotions: boolean;
  weeklyReports: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'paypal' | 'card';
  last4?: string;
  email?: string;
  isDefault: boolean;
}
