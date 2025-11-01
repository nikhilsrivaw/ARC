import { Router, Request, Response } from 'express';
import axios from 'axios';
import Logger from '@arc/logger';
import { LoginRequest, RegisterRequest } from '@arc/shared-types';

const router = Router();
const logger = new Logger({
    serviceName: 'api-gateway',
    logLevel: "DEBUG",
    enableConsole: true,
    enableFile: false,

});


const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';


//POST /auth/register


router.post('/register', async (req: Request, res: Response) => {
    try {
        const body: RegisterRequest = req.body;
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, body);
        logger.info('User registered', { email: body.email });
        res.status(201).json(response.data);
    } catch (error: any) {
        logger.error('Registration failed', { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: {
                code: 'REGISTRATION_FAILED',
                message: error.response?.data?.message || 'Registration failed',
            },
        });
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const body: LoginRequest = req.body;
        // Cal Auth Sevrice 
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, body);

        logger.info('USER logged in ', { email: body.email });
        res.status(200).json(response.data);
    } catch (error: any) {
        logger.error('Login failed ', { error: error.message });
        req.status(error.response?.status || 500).json({
            success: false,
            error: {
                code: 'LOGIN_FAILED',
                message: error.response?.data?.message || 'Login failed',
            }
        })

    }

});



// /auth/refresh

router.post('/refresh', async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        // Call Auth service 
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/refresh`, { refreshToken });
        logger.info('Token refreshed');
        res.status(200).json(response.data);
    } catch (error: any) {
        logger.error("Token refresh failed", { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: {
                code: 'REFRESH_FAILED',
                message: 'Token refresh failed',
            }
        })

    }

}) 

export default router;