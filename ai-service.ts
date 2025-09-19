import { AIMenuRequest, AIMenuResponse } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

class AIService {
  private apiKey: string | null = null;

  // 👇 Se establece la clave una sola vez en el dispositivo, NO está en el código público
  async init(): Promise<void> {
    const storedKey = await AsyncStorage.getItem('nutrireto_ai_key');
    if (storedKey) {
      this.apiKey = storedKey;
    }
  }

  async setApiKey(key: string): Promise<void> {
    if (!key?.trim()) throw new Error('API key requerida');
    this.apiKey = key.trim();
    await AsyncStorage.setItem('nutrireto_ai_key', this.apiKey);
  }

  async getApiKey(): Promise<string | null> {
    if (!this.apiKey) {
      this.apiKey = await AsyncStorage.getItem('nutrireto_ai_key');
    }
    return this.apiKey;
  }

  async generateMenu(request: AIMenuRequest): Promise<AIMenuResponse> {
    const apiKey = await this.getApiKey();
    if (!apiKey) throw new Error('Configura tu API key en la app');

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // 👈 Usa la clave guardada en AsyncStorage
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Eres un nutricionista experto.' },
          { role: 'user', content: 'Genera un menú de prueba' }
        ],
      })
    });

    const data = await response.json();
    return data;
  }
}

export const aiService = new AIService();
