import { Request, Response } from 'express';
import { THttpResponse } from '../types/types';
import config from '../config/config';
import { EApplicationEnvironmnet } from '../constant/application';
import logger from './logger';

 
export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    };

    if (config.NODE_ENV === EApplicationEnvironmnet.PRODUCTION) {
        delete response.request.ip;
    }

    logger.log('APPLICATION RESPONSE', {
        meta: response
    });

    res.status(responseStatusCode).json(response);
};
