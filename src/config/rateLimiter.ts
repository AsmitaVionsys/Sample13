import { Connection } from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';

export let rateLimiterMongo: null | RateLimiterMongo = null;

// Initialize rate limiter
export const initRateLimiter = (mongooseConnection: Connection) => {
    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConnection,
        points: 10,
        duration: 60
    });
};
