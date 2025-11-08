import { Request, Response, NextFunction } from 'express';
import { AppError } from '@arc/shared-utils';
export declare function errorHandler(err: AppError | Error, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=errorHandler.d.ts.map