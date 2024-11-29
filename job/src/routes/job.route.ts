import { Router, NextFunction, Request, Response } from 'express';

import { post } from '../controllers/job.controller';

const eventRouter: Router = Router();

eventRouter.post(
  '/job',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await post(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default eventRouter;
