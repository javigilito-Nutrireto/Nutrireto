import { Meal } from '@/types';

export const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Ensalada Mediterránea con Pollo',
    ingredients: ['Pechuga de pollo', 'Lechuga', 'Tomate cherry', 'Pepino', 'Aceitunas', 'Queso feta', 'Aceite de oliva'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    instructions: [
      'Cocinar la pechuga de pollo a la plancha',
      'Cortar las verduras en trozos pequeños',
      'Mezclar todos los ingredientes',
      'Aliñar con aceite de oliva y limón'
    ],
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 12,
      fat: 28
    },
    tags: ['high_protein', 'mediterranean'],
    allergens: ['lactose']
  },
  {
    id: '2',
    name: 'Salmón al Horno con Verduras',
    ingredients: ['Filete de salmón', 'Brócoli', 'Zanahoria', 'Calabacín', 'Aceite de oliva', 'Limón'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    instructions: [
      'Precalentar el horno a 200°C',
      'Cortar las verduras en trozos medianos',
      'Colocar el salmón y verduras en una bandeja',
      'Hornear durante 20-25 minutos'
    ],
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 15,
      fat: 22
    },
    tags: ['high_protein', 'mediterranean'],
    allergens: ['seafood']
  },
  {
    id: '3',
    name: 'Bowl Vegano de Quinoa',
    ingredients: ['Quinoa', 'Garbanzos', 'Aguacate', 'Tomate', 'Pepino', 'Tahini', 'Limón'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
    instructions: [
      'Cocinar la quinoa según las instrucciones',
      'Escurrir y enjuagar los garbanzos',
      'Cortar las verduras',
      'Servir todo en un bowl con salsa de tahini'
    ],
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 52,
      fat: 20
    },
    tags: ['vegan', 'high_protein'],
    allergens: []
  },
  {
    id: '4',
    name: 'Tortilla de Claras con Espinacas',
    ingredients: ['Claras de huevo', 'Espinacas frescas', 'Champiñones', 'Cebolla', 'Aceite de oliva'],
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400',
    instructions: [
      'Saltear las verduras en una sartén',
      'Batir las claras de huevo',
      'Añadir las claras a la sartén',
      'Cocinar hasta que cuaje'
    ],
    nutrition: {
      calories: 180,
      protein: 20,
      carbs: 8,
      fat: 8
    },
    tags: ['high_protein', 'low_carb'],
    allergens: ['eggs']
  },
  {
    id: '5',
    name: 'Pasta Integral con Pesto',
    ingredients: ['Pasta integral', 'Albahaca', 'Piñones', 'Ajo', 'Parmesano', 'Aceite de oliva'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
    instructions: [
      'Cocinar la pasta según las instrucciones',
      'Preparar el pesto triturando todos los ingredientes',
      'Mezclar la pasta con el pesto',
      'Servir caliente'
    ],
    nutrition: {
      calories: 520,
      protein: 18,
      carbs: 68,
      fat: 22
    },
    tags: ['vegetarian', 'mediterranean'],
    allergens: ['lactose', 'nuts']
  },
  {
    id: '6',
    name: 'Pollo Teriyaki con Arroz',
    ingredients: ['Pechuga de pollo', 'Arroz integral', 'Salsa teriyaki', 'Brócoli', 'Zanahoria'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    instructions: [
      'Cocinar el arroz integral',
      'Marinar el pollo en salsa teriyaki',
      'Cocinar el pollo a la plancha',
      'Saltear las verduras y servir todo junto'
    ],
    nutrition: {
      calories: 480,
      protein: 38,
      carbs: 45,
      fat: 18
    },
    tags: ['high_protein'],
    allergens: ['soy']
  },
  {
    id: '7',
    name: 'Smoothie Bowl de Frutas',
    ingredients: ['Plátano', 'Fresas', 'Arándanos', 'Yogur griego', 'Granola', 'Miel'],
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400',
    instructions: [
      'Congelar las frutas la noche anterior',
      'Triturar las frutas con yogur',
      'Servir en un bowl',
      'Decorar con granola y frutas frescas'
    ],
    nutrition: {
      calories: 320,
      protein: 15,
      carbs: 58,
      fat: 8
    },
    tags: ['vegetarian'],
    allergens: ['lactose']
  },
  {
    id: '8',
    name: 'Tacos de Pescado',
    ingredients: ['Pescado blanco', 'Tortillas de maíz', 'Repollo', 'Aguacate', 'Lima', 'Cilantro'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    instructions: [
      'Cocinar el pescado con especias',
      'Calentar las tortillas',
      'Preparar la ensalada de repollo',
      'Montar los tacos con todos los ingredientes'
    ],
    nutrition: {
      calories: 380,
      protein: 28,
      carbs: 35,
      fat: 16
    },
    tags: ['high_protein'],
    allergens: ['seafood']
  },
  {
    id: '9',
    name: 'Curry de Lentejas',
    ingredients: ['Lentejas rojas', 'Leche de coco', 'Cebolla', 'Ajo', 'Jengibre', 'Especias curry'],
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
    instructions: [
      'Saltear cebolla, ajo y jengibre',
      'Añadir las lentejas y especias',
      'Agregar leche de coco y agua',
      'Cocinar hasta que las lentejas estén tiernas'
    ],
    nutrition: {
      calories: 340,
      protein: 16,
      carbs: 48,
      fat: 12
    },
    tags: ['vegan', 'high_protein'],
    allergens: []
  },
  {
    id: '10',
    name: 'Wrap de Atún y Aguacate',
    ingredients: ['Tortilla integral', 'Atún en agua', 'Aguacate', 'Lechuga', 'Tomate', 'Yogur griego'],
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    instructions: [
      'Escurrir el atún',
      'Cortar el aguacate y las verduras',
      'Extender yogur en la tortilla',
      'Rellenar y enrollar el wrap'
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 28,
      fat: 22
    },
    tags: ['high_protein'],
    allergens: ['seafood', 'lactose']
  }
];
