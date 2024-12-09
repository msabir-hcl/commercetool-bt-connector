import { Payment, PaymentPagedQueryResponse } from '@commercetools/platform-sdk';
import { createApiRoot } from '../client/create.client';

export const updatePaymentById = async (
  payment: { [key: string]: any }
): Promise<Payment | undefined> => {
  if (!payment) {
    return undefined;
  }
  const apiRoot = createApiRoot();
  const response = await apiRoot
      .payments()
      .withId({ID:payment.id})
      .post({body:{
        "version": payment.version,
        "actions": [
            {
                "action" : "setCustomField",
                "name" : "findTransactionRequest",
                "value" : "{}"
              }
        ]
      }})
      .execute() 
    return response.body
};

export const getPaymentWithSettlingStatus =  async (): Promise<PaymentPagedQueryResponse | undefined> => {
    const apiRoot = createApiRoot();
    const response = await apiRoot
      .payments()
      .get({
        queryArgs: {
          where: `paymentStatus(interfaceCode="submitted_for_settlement" or interfaceCode="settling")`
        },
      })
      .execute()
    return response.body;
  };
  
export const getPaymentById = async (
  paymentId: string
): Promise<Payment | undefined> => {
  if (!paymentId) {
    return undefined;
  }
  const apiRoot = createApiRoot();
  const response = await apiRoot
    .payments()
    .withId({ ID: paymentId })
    .get()
    .execute();
  return response.body;
};
