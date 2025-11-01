import express, { Express, Request, Response, NextFunction } from 'express';
  import authMiddleware from '@arc/auth-middleware';
  import Logger from '@arc/logger';

  import authRoutes from './routes/auth';
  import userRoutes from './routes/users';
  import projectRoutes from './routes/projects';
  import taskRoutes from './routes/tasks';
  import { limiter } from './middleware/rateLimiter';
  import { errorHandler } from './middleware/errorHandler';

  const app: Express = express();

  const logger = new Logger({
    serviceName: 'api-gateway',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
  });




  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });


  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'api-gateway' });
  });


  app.use(limiter);


  app.use('/auth', authRoutes);

  // 6. AUTH MIDDLEWARE (for protected routes)
  app.use(authMiddleware);

  // 7. PROTECTED ROUTES (REQUIRE AUTH)
  app.use('/users', userRoutes);
  app.use('/projects', projectRoutes);
  app.use('/tasks', taskRoutes);

  // 8. ERROR HANDLER (MUST BE LAST!)
  app.use(errorHandler);

  export default app;