// aiOpenAIService.js
import axios from 'axios';

// Aquí deberías usar una variable de entorno para tu API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const generateMenu = async (userData) => {
  try {
    const prompt = `
Genera un menú diario considerando lo siguiente:
- Edad: ${userData.age}
- Peso: ${userData.weight} kg
- Altura: ${userData.height} cm
- Alergias: ${userData.allergies.join(', ')}
- Preferencias: ${userData.preferences.join(', ')}
- Objetivo nutricional: ${userData.goal}
- Plan contratado: ${userData.plan}
Devuelve una lista de comidas con nombre, ingredientes, instrucciones y valor nutricional.
`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un nutricionista que genera menús diarios personalizados.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Devuelve el contenido generado por la IA
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generando menú con OpenAI:', error);
    return null;
  }
};
