import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';

/**
 * Middleware for error handling
 * @param error The error object
 * @param req The express request
 * @param res The Express response
 * @param next
 * @returns
 */
export const errorMiddleware = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.error("==ERROR==", error)
  if (error instanceof CustomError) {
    if (typeof error.statusCode === 'number') {
      res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
      });
      logger.error("==ERROR2==", error)
      return;
    }
  }
  logger.error("==ERROR3==", error)
  res.status(500).send('Internal server error');
};
