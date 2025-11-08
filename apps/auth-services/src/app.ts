import express, { Express, Request, Response, NextFunction } from 'express';
import Logger from '@arc/logger';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();


const logger = new Logger({
    serviceName: 'auth-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false
});



app.use(express.json);
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'auth-service' });
});


app.use('/auth', authRoutes);
app.use(errorHandler);

export default app;