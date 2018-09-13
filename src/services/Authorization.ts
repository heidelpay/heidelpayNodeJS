import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Authorization, { authorizeObject } from '../payments/business/Authorization'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'
import AbstractPayment from '../payments/business/AbstractPayment'

export default (args: authorizeObject, paymentService: PaymentService): Promise<Authorization> => {
  return new Promise(async resolve => {
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
      .post(apiURL.URL_PAYMENT_AUTHORIZE, payload, paymentService.getHeidelpay().getPrivateKey())

    // New Authorize with Hedeipay instance
    let authorize = new Authorization(paymentService.getHeidelpay())

    // Set authorize Id
    authorize.setId(response.id)

    // Mapper resources
    authorize = ResponseResourceMapper(
      authorize as AbstractPayment,
      response.resources
    ) as Authorization

    // Resolve final result
    resolve(authorize)
  })
}
