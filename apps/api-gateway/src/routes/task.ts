  import { Router, Request, Response } from 'express';
  import axios from 'axios';
  import Logger from '@arc/logger';

  const router = Router();
  const logger = new Logger({
    serviceName: 'api-gateway',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
  });
  const PROJECT_SERVICE_URL = process.env.PROJECT_SERVICE_URL || 'http://localhost:3004';


    router.get('/', async (req: Request, res: Response) => {
    try {
      const context = (req as any).context;
      const { projectId } = req.query;

      const response = await axios.get(`${PROJECT_SERVICE_URL}/tasks?projectId=${projectId}`, {
        headers: {
          Authorization: req.headers.authorization,
          'X-Tenant-ID': context.tenantId,
        },
      });

      res.status(200).json(response.data);
    } catch (error: any) {
      logger.error('Failed to fetch tasks', { error: error.message });
      res.status(error.response?.status || 500).json({
        success: false,
        error: { code: 'FETCH_FAILED', message: 'Failed to fetch tasks' },
      });
    }
  });

  // POST /tasks - Create task
  router.post('/', async (req: Request, res: Response) => {
    try {
      const context = (req as any).context;

      const response = await axios.post(`${PROJECT_SERVICE_URL}/tasks`, req.body, {
        headers: {
          Authorization: req.headers.authorization,
          'X-Tenant-ID': context.tenantId,
        },
      });

      logger.info('Task created', { tenantId: context.tenantId });
      res.status(201).json(response.data);
    } catch (error: any) {
      logger.error('Failed to create task', { error: error.message });
      res.status(error.response?.status || 500).json({
        success: false,
        error: { code: 'CREATE_FAILED', message: 'Failed to create task' },
      });
    }
  });

export default router;