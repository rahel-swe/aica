import type { Request, Response } from 'express';
import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN,
});

async function createTextCompletion(prompt: string) {
  const chatCompletion = await client.chat.completions.create({
    model: 'openai/gpt-oss-safeguard-20b:groq',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return chatCompletion.choices[0]?.message?.content ?? '';
}

export const llmClient = {
  createTextCompletion,

  async testLLMClient(req: Request, res: Response) {
    const { prompt } = req.query;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const response = await createTextCompletion(prompt as string);

    res.status(200).json({
      prompt,
      response,
    });
  },
};
