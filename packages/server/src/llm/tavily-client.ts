import { tavily } from '@tavily/core';

export type TavilySearchResult = {
  title: string;
  url: string;
  content: string;
  source: string;
  score: number;
};

type TavilyOptions = {
  maxResults?: number;
  searchDepth?: 'basic' | 'advanced';
};

type SearchResultForLLM = {
  title: string;
  content: string;
  url: string;
};

const CONTENT_TRUNCATION = 500;

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

    console.log(response);

    return (response.results ?? []).map((r: any) => ({
      title: r.title ?? '',
      url: r.url ?? '',
      content: r.content ?? '',
      source: extractDomain(r.url ?? ''),
      score: r.score ?? 0,
    }));
  } catch (error) {
    console.error('[Tavily] Search failed:', error);
    return [];
  }
}

export function toSearchContext(
  results: TavilySearchResult[]
): SearchResultForLLM[] {
  return results.map((r) => ({
    title: r.title,
    content: r.content.slice(0, CONTENT_TRUNCATION),
    url: r.url,
  }));
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
