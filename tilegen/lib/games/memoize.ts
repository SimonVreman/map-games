export function memoize<T>(fn: () => Promise<T>): () => Promise<T> {
  let cache: T | null = null;
  return async () => {
    if (cache === null) {
      cache = await fn();
    }
    return cache;
  };
}
