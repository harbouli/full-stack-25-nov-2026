import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiReference } from '@scalar/express-api-reference';
import authRoutes from './routes/auth.routes.js';
import { openApiSpec } from './config/openapi.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/openapi.json', (_req, res) => {
  res.status(200).json(openApiSpec);
});

app.use(
  '/api/docs',
  apiReference({
    theme: 'kepler',
    url: '/api/openapi.json',
    content: openApiSpec,
    spec: {
      url: '/api/openapi.json',
      content: openApiSpec,
    },
  })
);

app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
