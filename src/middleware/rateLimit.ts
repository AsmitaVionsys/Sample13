import { NextFunction, Request, Response } from 'express';
import { rateLimiterMongo } from '../config/rateLimiter';
import httpError from '../utils/httpError';
import responseMessage from '../constant/responseMessage';

export default (req: Request, _: Response, next: NextFunction) => {
    if (rateLimiterMongo) {
        rateLimiterMongo
            .consume(req.ip as string, 1)
            .then(() => {
                next();
            })
            .catch(() => {
                httpError(next, new Error(responseMessage.TOO_MUCH_REQUEST), req, 429);
            });
    }
};
