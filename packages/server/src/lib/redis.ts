import { createClient, RedisClientType } from 'redis';
import { REDIS_HOST } from '../config';

let redisClient: RedisClientType | undefined = undefined;
let redisWarned = false;

export const getRedisClient = async (): Promise<RedisClientType | undefined> => {
  if (!REDIS_HOST) {
    if (!redisWarned) {
      console.warn('REDIS_HOST is not set. Caching will not be available.');
      redisWarned = true;
    }
    return undefined;
  }
  if (!redisClient) {
    const url = `redis://${REDIS_HOST}`
    console.log('Connecting to Redis at', url);
    const client = createClient({ url });

    await client.connect();
    redisClient = client as RedisClientType;
  }
  return redisClient;
}
