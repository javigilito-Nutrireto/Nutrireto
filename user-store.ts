import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { User, SubscriptionPlan, Allergy, NutritionalGoal } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_USER: User = {
  id: '1',
  name: 'Usuario',
  email: 'usuario@nutrireto.com',
  age: 30,
  weight: 70,
  height: 170,
  allergies: [],
  preferences: ['pollo', 'ensaladas', 'pasta'],
  goal: 'maintain',
  subscriptionPlan: 'free'
};

export const [UserProvider, useUser] = createContextHook(() => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('nutrireto_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const saveUser = useCallback(async (userData: Partial<User>) => {
    if (!userData || typeof userData !== 'object') return;
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      await AsyncStorage.setItem('nutrireto_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.log('Error saving user:', error);
    }
  }, [user]);

  const updateSubscription = useCallback(async (plan: SubscriptionPlan) => {
    const expiry = plan !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined;
    await saveUser({ 
      subscriptionPlan: plan,
      subscriptionExpiry: expiry
    });
  }, [saveUser]);

  const updateProfile = useCallback(async (data: {
    name?: string;
    age?: number;
    weight?: number;
    height?: number;
    allergies?: Allergy[];
    preferences?: string[];
    goal?: NutritionalGoal;
  }) => {
    if (!data || typeof data !== 'object') return;
    await saveUser(data);
  }, [saveUser]);

  const getBMI = useCallback(() => {
    const heightInM = user.height / 100;
    return user.weight / (heightInM * heightInM);
  }, [user.height, user.weight]);

  const getMaxMealsPerDay = useCallback(() => {
    switch (user.subscriptionPlan) {
      case 'free': return 1;
      case 'standard': return 5;
      case 'premium': return 20;
      default: return 1;
    }
  }, [user.subscriptionPlan]);

  return useMemo(() => ({
    user,
    isLoading,
    saveUser,
    updateSubscription,
    updateProfile,
    getBMI,
    getMaxMealsPerDay
  }), [user, isLoading, saveUser, updateSubscription, updateProfile, getBMI, getMaxMealsPerDay]);
});
