import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import arcjetMiddleware from './src/middleware/arcjet-middleware';
import errorMiddleware from './src/middleware/error-middleware';
import { auth } from './src/utils/auth';
import apiRouter from './src/routes';

const app = express();

app.use(
  cors({
    origin: [Bun.env.CLIENT_URL!, 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// better-auth handler should be top of express.json()
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());
// app.use(arcjetMiddleware);

app.use('/api', apiRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.send({ success: true, message: 'AICA server is healthy.' });
});

app.use(errorMiddleware);

app.listen(Bun.env.PORT, () => {
  console.log(`Server is running on http://localhost:${Bun.env.PORT}`);
});

export default app;
