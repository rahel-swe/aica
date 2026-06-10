import type { TavilySearchResult } from '../llm/tavily-client';

type SearchResultForLLM = {
  title: string;
  content: string;
  url: string;
};

const CONTENT_TRUNCATION = 500;

export function toSearchContext(
  results: TavilySearchResult[]
): SearchResultForLLM[] {
  return results.map((r) => ({
    title: r.title,
    content: r.content.slice(0, CONTENT_TRUNCATION),
    url: r.url,
  }));
}
