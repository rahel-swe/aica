type RoadmapSourceRefreshInput = {
  title: string;
  slug: string;
};

export type RoadmapSourceNote = {
  title: string;
  url: string;
  source: string;
};

export class RoadmapSourceRefreshService {
  async getSourceNotes(
    input: RoadmapSourceRefreshInput
  ): Promise<RoadmapSourceNote[]> {
    if (!process.env.BRAVE_SEARCH_API_KEY) return [];

    try {
      const params = new URLSearchParams({
        q: `${input.title} learning roadmap current skills official docs`,
        count: '3',
        safesearch: 'moderate',
      });

      const response = await fetch(
        `https://api.search.brave.com/res/v1/web/search?${params.toString()}`,
        {
          headers: {
            Accept: 'application/json',
            'X-Subscription-Token': process.env.BRAVE_SEARCH_API_KEY,
          },
          signal: AbortSignal.timeout(4000),
        }
      );

      if (!response.ok) return [];

      const data = (await response.json()) as {
        web?: {
          results?: Array<{
            title?: string;
            url?: string;
          }>;
        };
      };

      return (data.web?.results ?? [])
        .filter((item) => item.title && item.url)
        .slice(0, 3)
        .map((item) => ({
          title: item.title!,
          url: item.url!,
          source: 'brave-search',
        }));
    } catch {
      return [];
    }
  }
}

export const roadmapSourceRefreshService = new RoadmapSourceRefreshService();
