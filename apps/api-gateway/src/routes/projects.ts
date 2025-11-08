import { Router, Request, Response } from 'express';
import axios from 'axios';
import Logger from '@arc/logger';

const router:Router = Router();

const logger = new Logger({
    serviceName: 'api-gateway',
    logLevel: "DEBUG",
    enableConsole: true,
    enableFile: false
});

const PROJECT_SERVICE_URL = process.env.PROJECT_SERVICE_URL || 'http://localhost:3004';
// GET /projects - List all projects
router.get('/', async (req: Request, res: Response) => {
    try {
        const context = (req as any).context;
        const response = await axios.post(`${PROJECT_SERVICE_URL}/projects`, {
            headers: {
                Authorization: req.headers.authorization,
                'X-Tenant-ID': context.tenantId,
            }
        });
        res.status(200).json(response.data);
    } catch (error: any) {
        logger.error("failed to fetch projects ", { error: error.message });
        res.status(error.response?.status || 500).json({
            succes: false,
            error: { code: "FETCH_FAILED", message: " failed to fetch the projects" }
        })

    }
});
// POST /projects - Create project
router.post('/', async (req: Request, res: Response) => {
    try {
        const context = (req as any).context;

        const response = await axios.post(`${PROJECT_SERVICE_URL}/projects`, req.body, {
            headers: {
                Authorization: req.headers.authorization,
                'X-Tenant-ID': context.tenantId,
            },
        });
        logger.info('Project created', { tenantId: context.tenantId });
        res.status(201).json(response.data);



    } catch (error: any) {
        logger.error('Failed to create project', { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: { code: 'CREATE_FAILED', message: 'Failed to create project' },
        });
    }
})

export default router;