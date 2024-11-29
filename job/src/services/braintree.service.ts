import { logger } from '../utils/logger.utils';
import {
  Environment,
  Customer,
  ValidatedResponse,
  Transaction,
  BraintreeGateway,
} from 'braintree';
import CustomError from '../errors/custom.error';
import { TransactionGateway } from '../interfaces/transaction.interface';
import { Package } from '../types/index.types';

const getBraintreeGateway = () => {
  if (
    !process.env.BRAINTREE_MERCHANT_ID ||
    !process.env.BRAINTREE_PUBLIC_KEY ||
    !process.env.BRAINTREE_PRIVATE_KEY
  ) {
    throw new CustomError(
      500,
      'Internal Server Error - braintree config is missing'
    );
  }
  return new BraintreeGateway({
    environment:
      process.env.BRAINTREE_ENVIRONMENT === 'Production'
        ? Environment.Production
        : Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
};

function logResponse(
  requestName: string,
  response: ValidatedResponse<any> | Customer | Array<Transaction>
) {
  logger.info(`${requestName} response: ${JSON.stringify(response)}`);
}

export const findTransactionById = async (
  transactionId: string,
) => {
  logger.info(transactionId);
  const gateway = getBraintreeGateway();
  const transactionGateway = gateway.transaction as TransactionGateway;
  try{
    const response = await transactionGateway.find(
        transactionId
      );
    //   logResponse(`Transaction Status for ${transactionId} - ${response.status}`,response);
    //   return response.status;
  }catch(e){
    console.log("e",e)
    throw e
  }
  
};
