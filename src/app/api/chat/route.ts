import { OpenAI } from 'openai';

const api = new OpenAI({
  baseURL: 'https://api.aimlapi.com/v1',
  apiKey: '5bf82175ced447a78a49deeef073f473',
});

const main = async () => {
  const result = await api.chat.completions.create({
    model: 'Qwen/Qwen-14B-Chat',
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant who knows everything.',
      },
      {
        role: 'user',
        content: 'Tell me, why is the sky blue?'
      }
    ],
  });

  const message = result.choices[0].message.content;
  console.log(`Assistant: ${message}`);
};

main();