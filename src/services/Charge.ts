import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Charge, { chargeObject } from '../payments/business/Charge'
import AbstractPayment from '../payments/business/AbstractPayment'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'

export default (args: chargeObject | string, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async resolve => {
    let response: any

    if (typeof args === 'string') {
      // Call api end point to get response
      response = await paymentService
        .getRequestAdapter()
        .get(args, paymentService.getHeidelpay().getPrivateKey(), true)
    } else {
      const { amount, currency, returnUrl, customerId, typeId } = args
      let payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          customerId: customerId,
          typeId: typeId
        }
      }

      // Call api end point to get response
      response = await paymentService
        .getRequestAdapter()
        .post(apiURL.URL_PAYMENT_CHARGE, payload, paymentService.getHeidelpay().getPrivateKey())
    }

    // New Charge with Hedeipay instance
    let charge = new Charge(paymentService.getHeidelpay())

    // Set chargeId
    charge.setId(response.id)

    // Mapper resources
    charge = ResponseResourceMapper(charge as AbstractPayment, response.resources) as Charge

    // Resolve final result
    resolve(charge)
  })
}
