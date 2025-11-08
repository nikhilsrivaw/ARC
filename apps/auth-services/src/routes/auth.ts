import {Router , Request , Response } from 'express'
import { AuthService } from '../services/authService'
import Logger from '@arc/logger';
import {RegisterRequest , LoginRequest} from '@arc/shared-types';
import {AppError} from '@arc/shared-utils';

const router:Router = Router();


const logger = new Logger({
    serviceName : 'auth-service',
    logLevel : 'DEBUG',
    enableConsole : true,
    enableFile : false,


});


// POST /auth/register 


router.post('/register' , async (req : Request , res:Response)=>{
    try {
        const body : RegisterRequest = req.body;

        const result = await AuthService.register(body);

        res.status(201).json(result);
    } catch (error: any) {
        logger.error('Registeration Error' , {
            error: error instanceof Error ? error.message : String(error),
        });

        if(error instanceof AppError){
            res.status(error.statusCode).json({
                success: false,
                error:{
                    code: error.code,
                    message : error.message 
                }
            })
        }else {
            res.status(500).json({
                success: false,
                error:{
                    code: "REGISTRATION_ERROR",
                    message : error.message || "Registration failed"
                }
            })
        }
        
    }
});

router.post('/login' , async (req: Request , res: Response)=>{
    try {
        const body : LoginRequest = req.body;

        const result = await AuthService.login(body);

        res.status(200).json(result);

        

        
    } catch (error: any) {
        logger.error('Login Error', {error: error instanceof Error ? error.message : String(error)});
        if(error instanceof AppError){
            res.status(error.statusCode).json({
                succes: false , 
                error : {
                   code: error.code,
                   message : error.message  
                }
            })
        }else{
            res.status(401).json({
                success: false, 
                error : {
                    code : "LOGIN_ERROR",
                    message: error.message || 'Logion failed '
                }
            })
        }
    }
});


router.post('/refresh' , async (req : Request , res: Response)=>{
    try {
        const {refreshToken } = req.body;

        if(!refreshToken){
            res.status(400).json({
                success: false,
                error: {
                    code : 'MISSING_REFRESH_TOKEN',
                    message : 'Refrsh token is required '
                },
            });
            return;
        }

        const result = AuthService.refreshToken(refreshToken);

        res.status(200).json(result);
    } catch (error: any) {
        logger.error('Token refresh error', {
            error: error instanceof Error ? error.message : String(error),
        });

        if(error instanceof AppError){
            res.status(error.statusCode).json({
                success : false,
                error : {
                    code : error.code,
                    message: error.message
                }
            })
        }else {
            res.status(401).json({
                success : false,
                error : {
                    code : "REFRESH_ERROR",
                    message : error.message || 'Token Resfresh failed '
                }
            })
        }
        
    }
})

export default router ;