import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Cancel, { cancelAuthorizeObject } from '../payments/business/Cancel'
import AbstractPayment from '../payments/business/AbstractPayment'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'

export default (args: cancelAuthorizeObject, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async resolve => {
    let payload: any = {}

    // Add amount into payload if its passed
    if (args.amount) {
      payload.amount = args.amount
    }

    // Parse and replace URL with parameters
    const requestUrl = Utils.replaceUrl(apiURL.URL_PAYMENT_AUTHORIZE_CANCEL, {
      paymentId: args.paymentId,
      authorizationId: args.authorizationId
    })

    // Call api end point to get response
    const response: any = await paymentService
      .getRequestAdapter()
      .post(requestUrl, payload, paymentService.getHeidelpay().getPrivateKey())

    // New Cancel with Hedeipay instance
    let cancel = new Cancel(paymentService.getHeidelpay())

    // Set cancel Id
    cancel.setId(response.id)

    // Mapper resources
    cancel = ResponseResourceMapper(cancel as AbstractPayment, response.resources) as Cancel

    // Resolve final result
    resolve(cancel)
  })
}
