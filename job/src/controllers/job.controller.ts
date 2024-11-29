import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { getPaymentWithSettlingStatus, updatePaymentById } from '../services/commercetools.service';

const handlePaymentStatusUpdate = async () => {
  logger.info(`Fetching Payments from Commercetools`);
  const getPaymentList = await getPaymentWithSettlingStatus();
  if(!getPaymentList){
    logger.info("Undefined payment list. nothing to update");
    return undefined;
  }
  getPaymentList.results.forEach(async paymentItem => {
    logger.info(`Triggering FindTransaction BT for paymentId: ${paymentItem.id}`);
    try{
      const result = await updatePaymentById(paymentItem)
      if(!result){ console.log("Nothing to update"); return undefined; }
      logger.info(`UptatedStatus ${paymentItem.id}: ${result.paymentStatus.interfaceCode}`);
    }catch(e){
      logger.error(`Call to update payment status resulted in an error ${paymentItem.id}: ${e}`);
      throw e;
    }
  });

};


/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @param {NextFunction} next
 * @returns
 */
export const post = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    logger.info('Job message received');
    await handlePaymentStatusUpdate();
    response.status(200).send();
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(400, error.message));
    } else {
      next(error);
    }
  }
};
