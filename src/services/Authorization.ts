import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import FetchPayment from './FetchPayment'
import Authorization, { authorizeObject } from '../payments/business/Authorization'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';

export default (args: authorizeObject, paymentService: PaymentService): Promise<Authorization> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { amount, currency, typeId, customerId, returnUrl } = args
      let payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          typeId: typeId
        }
      }

      // Add customer Id into payload if its passed
      if (customerId) {
        payload.resources.customerId = customerId
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          apiURL.URL_PAYMENT_AUTHORIZE,
          payload,
          paymentService.getHeidelpay().getPrivateKey()
        )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Authorize with Hedeipay instance
      let authorization = new Authorization(paymentService.getHeidelpay())

      // Set authorization Id
      authorization.setId(response.id)

      // Set amount
      authorization.setAmount(response.amount)

      // Set currency
      authorization.setCurrency(response.currency)

      // Set return URL
      authorization.setReturnUrl(response.returnUrl)

      // Set resources
      authorization.setResources(response.resources)

      // Set Processing
      authorization.setProcessing(response.processing)

      // Set payment object
      authorization.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set Payload
      authorization.setPayload(response)

      // Resolve final result
      resolve(authorization)
    } catch (error) {
      // Reject with error object
      return reject(error)
    }
  })
}
