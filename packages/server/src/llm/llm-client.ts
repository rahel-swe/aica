import OpenAI from 'openai';

export const openaiClient = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: 'https://router.huggingface.co/v1',
});

export const LLM_MODEL = 'Qwen/Qwen2.5-72B-Instruct:novita';
// for comlex task and a bit slow
// 'Qwen/Qwen2.5-72B-Instruct:novita'
// deepseek-ai/DeepSeek-V4-Pro:fireworks-ai

// for easy task and fast, tools some time dose not work!
// 'openai/gpt-oss-20b:nscale'

export type LLMMessage = { role: 'user' | 'assistant'; content: string };

export async function createTextCompletion(
  prompt: string,
  options: { maxTokens?: number; model?: string } = {}
) {
  try {
    const response = await openaiClient.chat.completions.create({
      model: LLM_MODEL,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0]?.message?.content;
  } catch (error) {
    console.log(error);
  }
}
