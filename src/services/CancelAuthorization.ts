import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Cancel, { cancelAuthorizeObject } from '../payments/business/Cancel'
import FetchPayment from './FetchPayment'

export default (args: cancelAuthorizeObject, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async resolve => {
    let payload: any = {}

    // Add amount into payload if its passed
    if (args.amount) {
      payload.amount = args.amount
    }

    // Call api end point to get response
    const response: any = await paymentService.getRequestAdapter().post(
      Utils.replaceUrl(apiURL.URL_PAYMENT_AUTHORIZE_CANCEL, {
        paymentId: args.paymentId,
        authorizationId: args.authorizationId
      }),
      payload,
      paymentService.getHeidelpay().getPrivateKey()
    )

    // New Cancel with Hedeipay instance
    let cancel = new Cancel(paymentService.getHeidelpay())

    // Set cancel Id
    cancel.setId(response.id)

    // Set amount of cancel
    cancel.setAmount(response.amount)

    // Set resources
    cancel.setResources(response.resources)

    // Set payment object
    cancel.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

    // Resolve final result
    resolve(cancel)
  })
}
