// ── Retry utility ─────────────────────────────────────────────────────────────
// Exponential backoff: 700ms → 1400ms → 2800ms
// Retries transient failures (network, 5xx, rate-limit).
// Does NOT retry 4xx — those indicate a bad prompt or auth issue.

type RetryOptions = { attempts: number; baseDelayMs: number };

export async function withRetry<T>(
  fn: () => Promise<T>,
  { attempts, baseDelayMs }: RetryOptions
): Promise<T> {
  let lastError: Error = new Error('Unknown error');

  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      const isClientError =
        lastError.message.includes('400') ||
        lastError.message.includes('401') ||
        lastError.message.includes('403');

      if (isClientError || i === attempts) throw lastError;

      // Exponential backoff: 700ms, 1400ms, 2800ms
      await new Promise((r) => setTimeout(r, baseDelayMs * i));
    }
  }

  throw lastError;
}
