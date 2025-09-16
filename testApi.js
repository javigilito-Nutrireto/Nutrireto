import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const body = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hola, ¿cómo estás?' }]
};

fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(body)
})
  .then(res => res.json())
  .then(data => {
    console.log('Respuesta de ChatGPT:');
    console.log(data.choices[0].message.content);
  })
  .catch(err => {
    console.error('Error al llamar a la API:', err);
  });

