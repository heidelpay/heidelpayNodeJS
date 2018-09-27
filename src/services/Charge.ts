import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Charge, { chargeObject } from '../payments/business/Charge'
import FetchPayment from './FetchPayment';
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';

export default (args: chargeObject, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { amount, currency, returnUrl, customerId, typeId } = args
      const payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          customerId: customerId,
          typeId: typeId
        }
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(apiURL.URL_PAYMENT_CHARGE, payload, paymentService.getHeidelpay().getPrivateKey())

      // Handle errors response        
      if(response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Charge with Hedeipay instance
      let charge = new Charge(paymentService.getHeidelpay())

      // Set chargeId
      charge.setId(response.id)

      // Set amount
      charge.setAmount(response.amount)

      // Set resources
      charge.setResources(response.resources)

      // Set Processing
      charge.setProcessing(response.processing)

      // Set payment object
      charge.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Resolve final result
      resolve(charge)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
