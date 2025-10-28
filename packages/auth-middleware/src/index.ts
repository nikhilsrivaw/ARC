import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Logger from '@arc/logger';
import { JWTPayload, RequestContext } from '@arc/shared-types';




const logger = new Logger({
    serviceName: " auth-middleware",
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: true,
})


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: " NO token provided" });
        }

        const token = authHeader!.substring(7); // remove bearer

        // verify token signature 
        const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;

        (req as any).context = {
            userId: payload.userId,
            tenantId: payload.tenantId,
            email: payload.email,
            role: payload.role,
           
        } as RequestContext;

        logger.debug('User authenticated', { userId: payload.userId });
        next();

    } catch (error) {
        logger.error('Authentication failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        res.status(401).json({error : "INvalid or expired token "})

    }
}

export default authMiddleware;