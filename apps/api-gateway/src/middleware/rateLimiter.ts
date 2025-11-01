import rateLimit from 'express-rate-limit';
import Logger from '@arc/logger';
  import { Request, Response } from 'express';

const logger = new Logger({
    serviceName : 'api-gateway',
    logLevel: " DEBUG",
    enableConsole : true,
    enableFile : false,
});



// rate Limiter function


export const limiter =  rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100,
     message : " Too many requests fromt his IP , pelase try again later",
     standardheaders : true,
     legacyHeaders: false,
     skip: (req: Request)=>{
        // don't rate limit the helath api 

        if(req.path=== '/health'){
            return  true ;

        }
        return false 
     },
     handler: (req: Request, res: Response) =>{
         logger.warn('Rate limit exceeded', { ip: req.ip, path: req.path });
         res.status(429).json({
            success: false, 
            error:{
                code: 'TOO_MANY)REQUESTS',
                message: 'Too many requests, please try again later.',
            }
         })

     }
})