const path2dCache = new Map<string, Path2D>();

export function cachedPath(path: string) {
  if (path2dCache.has(path)) return path2dCache.get(path)!;

  const p = new Path2D(path);
  path2dCache.set(path, p);

  return p;
}
