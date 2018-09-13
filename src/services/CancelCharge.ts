import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Cancel, { cancelChargeObject } from '../payments/business/Cancel'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'
import AbstractPayment from '../payments/business/AbstractPayment'

export default (args: cancelChargeObject, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async resolve => {
    let payload: any = {}

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

    // Mapper resources
    cancel = ResponseResourceMapper(cancel as AbstractPayment, response.resources) as Cancel

    // Resolve final result
    resolve(cancel)
  })
}
