import * as apiURL from '../configs/apiURLs'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Cancel, { cancelAuthorizeObject } from '../payments/business/Cancel'

export default (args: cancelAuthorizeObject, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async resolve => {
    let payload: any = {}

    if (args.amount) {
      payload.amount = args.amount
    }

    const response: any = await paymentService.getRequestAdapter().post(
      Utils.replaceUrl(apiURL.URL_PAYMENT_AUTHORIZE_CANCEL, {
        paymentId: args.paymentId,
        authorizationId: args.authorizationId
      }),
      payload,
      paymentService.getHeidelpay().getPrivateKey()
    )

    // New Cancel with Hedeipay instance
    const cancel = new Cancel(paymentService.getHeidelpay())

    // Set cancel Id
    cancel.setId(response.id)

    // Set resources
    cancel
      .getResources()
      .setCustomerId(response.resources.customerId)
      .setMetadataId(response.resources.metadataId)
      .setPaymentId(response.resources.paymentId)
      .setTypeId(response.resources.typeId)
      .setRiskId(response.resources.riskId)

    resolve(cancel)
  })
}
