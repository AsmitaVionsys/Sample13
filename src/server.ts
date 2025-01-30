import app from './app';
import config from './config/config';
import { initRateLimiter } from './config/rateLimiter';
import databaseService from './services/database.service';
import logger from './utils/logger';

const server = app.listen(config.PORT);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        const connection = await databaseService.connect();

        logger.info('DATABASE CONNECTION', {
            meta: {
                CONNECTION_NAME: connection.name
            }
        });

        initRateLimiter(connection);

        logger.info(`RATE_LIMITER_INITIATED`);

        logger.info('APPLICATION RESPONSE', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        });
    } catch (error) {
        logger.error('APPLICATION ERROR', {
            meta: error
        });

        server.close((error) => {
            if (error) {
                logger.error('SERVER CLOSE ERROR', {
                    meta: error
                });
            }
        });
        process.exit(1);
    }
})();
