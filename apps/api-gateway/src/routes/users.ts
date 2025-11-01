import { Router, Request, Response } from 'express',
import axios from 'axios';
import Logger from '@arc/logger';


const router = Router();

const logger = new Logger({
    serviceName: 'api-gateway',
    logLevel: "DEBUG",
    enableConsole: true,
    enableFile: false
});


const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3002';
// get /user/me - Get current usern
router.get('/me', async (req: Request, res: Response) => {
    try {
        const context = (req as any).context;

        const response = await axios.get(`${USER_SERVICE_URL}/users/${context.userId}`, {
            headers: { Authorization: req.headers.authorization },
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        logger.error("Failed to get user", { error: error.message });

        res.status(error.response?.status || 500).json({
            success: false,
            error: { code: 'FETCH_FAILED', message: 'Failed to fetch user' },
        });

    }
});

// update user profile 

router.put('/me', async (req: Request, res: Response) => {
    try {
        const context = (req as any).context;
        const response = await axios.put(`${USER_SERVICE_URL}/users/${context.userId}`, req.body, {
            headers: { Authorization: req.headers.authorization },
        });

        logger.info("User updated ", { userId: context.userId });
        res.status(200).json(response.data)
    } catch (error: any) {
        logger.error("Error updating the user ", { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: { code: 'UPDATE_FAILED', message: 'Failed to update user' },

        })

    }
})

export default router;
