import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Charge, { chargeObject } from '../payments/business/Charge'
import FetchPayment from './FetchPayment';
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';
import { CLIENT_RENEG_WINDOW } from 'tls';

export default (args: chargeObject, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { amount, orderId, currency, returnUrl, customerId, typeId, metadataId } = args
      const payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          typeId: typeId
        }
      }

      // Add order Id into payload if its passed
      if (orderId) {
        payload.orderId = orderId
      }

      // Add customer Id into payload if its passed
      if (customerId) {
        payload.resources.customerId = customerId
      }

      // Add metadta Id into payload if its passed
      if (metadataId) {
        payload.resources.metadataId = metadataId
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(apiURL.URL_PAYMENT_CHARGE, payload, paymentService.getHeidelpay().getPrivateKey())

      // Handle errors response        
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Charge with Hedeipay instance
      let charge = new Charge(paymentService.getHeidelpay())

      // Set chargeId
      charge.setId(response.id)

      // Set amount
      charge.setAmount(response.amount)

      // Set order Id
      if(response.orderId) {
        charge.setOrderId(response.orderId)
      }

      // Set currency
      charge.setCurrency(response.currency)

      // Set return URL
      charge.setReturnUrl(response.returnUrl)

      // Set 3ds option
      charge.setCard3ds(response.card3ds)

      // Set resources
      charge.setResources(response.resources)

      // Set Processing
      charge.setProcessing(response.processing)

      // Set payment object
      charge.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set Payload
      charge.setPayload(response)

      // Resolve final result
      resolve(charge)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
