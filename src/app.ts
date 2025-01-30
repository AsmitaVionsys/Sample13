import express, { NextFunction, Request, Response } from 'express';
import router from './routes/apiRoute';
import path from 'path';
import globalErrorHandler from './middleware/globalErrorHandler';
import httpError from './utils/httpError';
import responseMessage from './constant/responseMessage';
import helmet from 'helmet';
import cors from 'cors';
import config from './config/config';

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: [config.FRONDEND_URL as string],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
        credentials: true
    })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/api/v1', router);

//404 Error Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    const error = new Error(responseMessage.NOT_FOUND('route'));
    httpError(next, error, req, 500);
});

app.use(globalErrorHandler);

export default app;
