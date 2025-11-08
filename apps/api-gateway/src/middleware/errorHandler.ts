import { Request, Response, NextFunction } from 'express';
import Logger from '@arc/logger';
import {AppError} from '@arc/shared-utils';
const logger = new Logger({
    serviceName : "api-gateway",
    logLevel : 'DEBUG',
    enableConsole: true,
    enableFile : false

});
 
 export function errorHandler(
    err: AppError | Error,
    req: Request,
    res:Response,
    next: NextFunction

 ): void {
    logger.error('Request Failed' , {
        path : req.path,
        method : req.method,
         error: err instanceof Error ? err.message : String(err),
        });


        if(err instanceof AppError){
            res.status(err.statusCode).json({
                success: false,
                error:{
                    code : err.code,
                    message: err.message,
                    details : err.details,
                }
            });
        }else{
            res.status(500).json({
                success: false,
                error: {
                    code : " INTERNAL_SERVER_ERROR",
                    message : " An error  occured"
                }
            })
        }
 }