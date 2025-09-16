// aiMenuGenerator.js
import { generateMenu } from './aiOpenAIService';

export const getDailyMenu = async (userData) => {
  const rawMenu = await generateMenu(userData);

  if (!rawMenu) return [];

  // Aquí podrías parsear el string a un array de objetos
  // Esto depende de cómo formatee OpenAI la respuesta
  // Ejemplo simple si devuelve JSON:
  try {
    const menuArray = JSON.parse(rawMenu);
    return menuArray;
  } catch (err) {
    console.warn('No se pudo parsear la respuesta de OpenAI, devolviendo rawMenu:', err);
    return [{ name: 'Menú generado', description: rawMenu }];
  }
};
