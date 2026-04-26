import type { Request, Response } from 'express';
import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN,
});

export const llmClient = {
  async testLLMClient(req: Request, res: Response) {
    const { prompt } = req.query;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const chatCompletion = await client.chat.completions.create({
      model: 'openai/gpt-oss-safeguard-20b:groq',
      messages: [
        {
          role: 'user',
          content: prompt as string,
        },
      ],
    });

    res.status(200).json({
      prompt,
      response: chatCompletion.choices[0]?.message,
    });

    // console.log(chatCompletion.choices[0]?.message);
  },
};
