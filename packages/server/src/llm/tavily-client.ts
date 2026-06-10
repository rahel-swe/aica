import { tavily } from '@tavily/core';
import { extractDomain } from '../utils/extract-domain';

export type TavilySearchResult = {
  title: string;
  url: string;
  content: string;
  source: string;
  score: number;
  favicon: string;
};

type TavilyOptions = {
  maxResults?: number;
  searchDepth?: 'basic' | 'advanced';
};

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function tavilySearch(
  query: string,
  options: TavilyOptions = {}
): Promise<TavilySearchResult[]> {
  if (!process.env.TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY is not set');
  }

  try {
    const response = await tvly.search(query, {
      max_results: options.maxResults ?? 3,
      search_depth: options.searchDepth ?? 'basic',
      include_answer: false,
      include_raw_content: false,
      include_images: false,
    });

    return (response.results ?? []).map((r: any) => ({
      title: r.title ?? '',
      url: r.url ?? '',
      favicon: r.favicon ?? '',
      content: r.content ?? '',
      source: extractDomain(r.url ?? ''),
      score: r.score ?? 0,
    }));
  } catch (error) {
    console.error('[Tavily] Search failed:', error);
    return [];
  }
}
