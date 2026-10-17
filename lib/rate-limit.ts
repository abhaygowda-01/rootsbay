/**
 * Minimal fixed-window rate limiter, kept in memory.
 *
 * Good enough to stop a single client hammering the form. On serverless hosts
 * (Vercel) each instance has its own memory, so for stronger protection swap
 * this for Upstash Redis (@upstash/ratelimit) or Vercel's firewall rules.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  entry.count += 1;
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
  }
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}
