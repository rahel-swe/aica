import type { Request, Response } from 'express';
import { OpenAI } from 'openai';
import aicaSystemPrompt from '@/src/llm/prompts/aica-llm-system-prompt.txt';

export class LlmClient {
  private readonly client: OpenAI;
  private readonly model = 'openai/gpt-oss-safeguard-20b:groq';

  constructor() {
    this.client = new OpenAI({
      baseURL: 'https://router.huggingface.co/v1',
      apiKey: process.env.HF_TOKEN,
    });
  }

  createTextCompletion = async (prompt: string): Promise<string> => {
    const chatCompletion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: aicaSystemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return chatCompletion.choices[0]?.message?.content ?? '';
  };

  testLLMClient = async (req: Request, res: Response) => {
    const { prompt } = req.query;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const response = await this.createTextCompletion(prompt as string);

    res.status(200).json({
      prompt,
      response,
    });
  };
}

export const llmClient = new LlmClient();
