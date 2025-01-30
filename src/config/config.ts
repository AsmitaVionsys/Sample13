import Dotenv from 'dotenv-flow';

Dotenv.config();

export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    SERVER_URL: process.env.SERVER_URL,
    FRONDEND_URL: process.env.FRONDEND_URL,
    MONGODB_URL: process.env.MONGODB_URL
};
