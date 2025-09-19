import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Meal, DailyMeals, AIMenuRequest } from '@/types';
import { MOCK_MEALS } from '@/data/meals';
import { useUser } from './user-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import aiService from '@/services/ai-service';

export const [MealsProvider, useMeals] = createContextHook(() => {
  const { user, getMaxMealsPerDay } = useUser();
  const [dailyMeals, setDailyMeals] = useState<DailyMeals | null>(null);
  const [favoriteMeals, setFavoriteMeals] = useState<string[]>([]);
  const [mealHistory, setMealHistory] = useState<DailyMeals[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterMealsForUser = useCallback((meals: Meal[]): Meal[] => {
    return meals.filter(meal => {
      const hasAllergy = meal.allergens.some(allergen => {
        if (!allergen || typeof allergen !== 'string') return false;
        return user.allergies.includes(allergen);
      });
      return !hasAllergy;
    });
  }, [user.allergies]);

  const generateDailyMeals = useCallback(async (useAI: boolean = false) => {
    const today = new Date().toISOString().split('T')[0];
    const maxMeals = getMaxMealsPerDay();
    
    const existingMeals = mealHistory.find(day => day.date === today);
    if (existingMeals && !useAI) {
      setDailyMeals(existingMeals);
      return;
    }

    let selectedMeals: Meal[] = [];

    if (useAI) {
      try {
        console.log('🤖 Generating AI meals...');
        const previousMealNames = mealHistory
          .slice(0, 3)
          .flatMap(day => day.meals.map(meal => meal.name));

        const aiRequest: AIMenuRequest = {
          userId: user.id,
          preferences: user.preferences,
          allergies: user.allergies,
          goal: user.goal,
          mealsCount: maxMeals,
          previousMeals: previousMealNames
        };

        const aiResponse = await aiService.generateMenu(aiRequest, user.subscriptionPlan);
        selectedMeals = aiResponse.meals;
        console.log(`✅ Generated ${selectedMeals.length} AI meals`);
      } catch (error) {
        console.log('AI generation failed, falling back to mock meals:', error);
        const availableMeals = filterMealsForUser(MOCK_MEALS);
        selectedMeals = availableMeals
          .sort(() => Math.random() - 0.5)
          .slice(0, maxMeals);
      }
    } else {
      const availableMeals = filterMealsForUser(MOCK_MEALS);
      selectedMeals = availableMeals
        .sort(() => Math.random() - 0.5)
        .slice(0, maxMeals);
    }

    const newDailyMeals: DailyMeals = {
      date: today,
      meals: selectedMeals,
      maxMeals
    };

    setDailyMeals(newDailyMeals);
    
    const updatedHistory = [newDailyMeals, ...mealHistory.filter(day => day.date !== today).slice(0, 29)];
    setMealHistory(updatedHistory);
    await AsyncStorage.setItem('nutrireto_history', JSON.stringify(updatedHistory));
  }, [mealHistory, getMaxMealsPerDay, filterMealsForUser, user]);

  const loadData = useCallback(async () => {
    try {
      const [favorites, history] = await Promise.all([
        AsyncStorage.getItem('nutrireto_favorites'),
        AsyncStorage.getItem('nutrireto_history')
      ]);

      if (favorites) setFavoriteMeals(JSON.parse(favorites));
      if (history) setMealHistory(JSON.parse(history));
      
      await generateDailyMeals();
    } catch (error) {
      console.log('Error loading meals data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [generateDailyMeals]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleFavorite = useCallback(async (mealId: string) => {
    if (!mealId || typeof mealId !== 'string') return;
    
    const newFavorites = favoriteMeals.includes(mealId)
      ? favoriteMeals.filter(id => id !== mealId)
      : [...favoriteMeals, mealId];
    
    setFavoriteMeals(newFavorites);
    await AsyncStorage.setItem('nutrireto_favorites', JSON.stringify(newFavorites));
  }, [favoriteMeals]);

  const getFavoriteMealsData = useCallback((): Meal[] => {
    return MOCK_MEALS.filter(meal => favoriteMeals.includes(meal.id));
  }, [favoriteMeals]);

  const regenerateMeals = useCallback(async (useAI: boolean = false) => {
    const today = new Date().toISOString().split('T')[0];
    
    const updatedHistory = mealHistory.filter(day => day.date !== today);
    setMealHistory(updatedHistory);
    await AsyncStorage.setItem('nutrireto_history', JSON.stringify(updatedHistory));
    
    await generateDailyMeals(useAI);
  }, [mealHistory, generateDailyMeals]);

  const generateAIMeals = useCallback(async () => {
    await regenerateMeals(true);
  }, [regenerateMeals]);

  return useMemo(() => ({
    dailyMeals,
    favoriteMeals,
    mealHistory,
    isLoading,
    toggleFavorite,
    getFavoriteMealsData,
    regenerateMeals,
    generateDailyMeals,
    generateAIMeals
  }), [dailyMeals, favoriteMeals, mealHistory, isLoading, toggleFavorite, getFavoriteMealsData, regenerateMeals, generateDailyMeals, generateAIMeals]);
});
