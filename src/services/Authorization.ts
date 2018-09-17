import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Authorization, { authorizeObject } from '../payments/business/Authorization'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'
import AbstractPayment from '../payments/business/AbstractPayment'

export default (
  args: authorizeObject | string,
  paymentService: PaymentService
): Promise<Authorization> => {
  return new Promise(async resolve => {
    let response: any

    if (typeof args === 'string') {
      // Call api end point to get response
      response = await paymentService
        .getRequestAdapter()
        .get(args, paymentService.getHeidelpay().getPrivateKey(), true)
    } else {
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
      response = await paymentService
        .getRequestAdapter()
        .post(apiURL.URL_PAYMENT_AUTHORIZE, payload, paymentService.getHeidelpay().getPrivateKey())
    }

    // New Authorize with Hedeipay instance
    let authorization = new Authorization(paymentService.getHeidelpay())

    // Set authorization Id
    authorization.setId(response.id)
    authorization.setAmount(response.amount)

    // Mapper resources
    authorization = ResponseResourceMapper(
      authorization as AbstractPayment,
      response.resources
    ) as Authorization

    // Resolve final result
    resolve(authorization)
  })
}
