import { redis } from "../lib/redis";

type AnalyticsArgs = {
  retention?: number;
};
export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;

  constructor(options?: AnalyticsArgs) {
    if (options?.retention) this.retention = options.retention;
  }
  async track(namespace: string, event: object = {}) {
    const key = `analytics::${namespace}`;
    await redis.hincrby(key, JSON.stringify(event), 1);
  }
}

export const analytics = new Analytics();
