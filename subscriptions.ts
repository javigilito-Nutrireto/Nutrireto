import { SubscriptionInfo } from '@/types';

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionInfo> = {
  free: {
    plan: 'free',
    price: 0,
    mealsPerDay: 1,
    features: ['1 comida al día', 'Recetas básicas', 'Perfil nutricional']
  },
  standard: {
    plan: 'standard',
    price: 12.99,
    mealsPerDay: 5,
    features: ['Hasta 5 comidas al día', 'Recetas premium', 'Seguimiento nutricional', 'Sin anuncios']
  },
  premium: {
    plan: 'premium',
    price: 20,
    mealsPerDay: 20,
    features: ['Hasta 20 comidas al día', 'Recetas exclusivas', 'Análisis nutricional avanzado', 'Soporte prioritario', 'Planes personalizados']
  }
};

export const ALLERGY_ICONS = {
  gluten: '🌾',
  lactose: '🥛',
  nuts: '🥜',
  seafood: '🦐',
  eggs: '🥚',
  soy: '🫘'
};

export const ALLERGY_LABELS = {
  gluten: 'Sin Gluten',
  lactose: 'Sin Lactosa',
  nuts: 'Sin Frutos Secos',
  seafood: 'Sin Mariscos',
  eggs: 'Sin Huevos',
  soy: 'Sin Soja'
};
