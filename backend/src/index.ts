import { env } from './infrastructure/config/env';
import express from 'express';
import { connectDB } from './infrastructure/config/database';
import routes from './interfaces/routes';
import { errorHandler } from './infrastructure/middlewares/ErrorMiddleware';
import { logger } from './utils/logger';
import fs from 'fs';
import path from 'path';

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

process.on('uncaughtException', (error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(error.name, error.message);
});

process.on('unhandledRejection', (error: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(error.name, error.message);
});

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', routes);

app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated!');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT RECEIVED. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated!');
  });
});