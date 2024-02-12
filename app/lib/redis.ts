import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://eu2-square-sunfish-31524.upstash.io",
  token: process.env.REDIS_KEY!,
});
// console.log(process.env.REDIS_KEY);
// const data = await redis.set("foo", "bar");
