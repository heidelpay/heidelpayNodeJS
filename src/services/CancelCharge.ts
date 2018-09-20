import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Cancel, { cancelChargeObject } from '../payments/business/Cancel'
import FetchPayment from './FetchPayment'

export default (args: cancelChargeObject, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async resolve => {
    let payload: any = {}

    // Add amount into payload if its passed
    if (args.amount) {
      payload.amount = args.amount
    }

    // Call api end point to get response
    const response: any = await paymentService.getRequestAdapter().post(
      Utils.replaceUrl(apiURL.URL_PAYMENT_CHARGE_CANCEL, {
        paymentId: args.paymentId,
        chargeId: args.chargeId
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
