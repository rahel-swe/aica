import express, { type Request, type Response } from 'express';
import ENV from './src/config/env.config';
import cors from 'cors';
import errorMiddleware from './src/middleware/error.middleware';
import arcjectMiddleware from './src/middleware/arcjet.middleware';
import onboardRouter from './src/routes/onboarding.route';
import processRouter from './src/routes/processing.route';
import dashboardRouter from './src/routes/dashboard.route';
import careerRouter from './src/routes/career.route';
import authRouter from './src/routes/auth.route';
import profileRouter from './src/routes/profile.route';
import recommendRouter from './src/routes/recommendation.route';
import uniRouter from './src/routes/universities.route';
import chatRouter from './src/routes/ai.route';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './src/utils/auth';

const app = express();

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());
app.use(arcjectMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/recommendations', recommendRouter);
app.use('/api/v1/onboarding', onboardRouter);
app.use('/api/v1/processing', processRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/careers', careerRouter);
app.use('/api/v1/universities', uniRouter);
app.use('/api/v1/chat/why', chatRouter);
app.use('/api/v1/chat/why', chatRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Hello, From Academ AI!' });
});

app.use(errorMiddleware);

app.listen(ENV.PORT, async () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});

export default app;
