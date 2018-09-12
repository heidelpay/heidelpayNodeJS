import * as apiURL from '../configs/apiURLs'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Charge from '../payments/business/Charge'
import { chargeAuthorizeObject } from '../payments/business/Authorization'

export default (args: chargeAuthorizeObject, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async resolve => {
    let payload: any = {}

    if (args.amount) {
      payload.amount = args.amount
    }

    const response: any = await paymentService.getRequestAdapter().post(
      Utils.replaceUrl(apiURL.URL_PAYMENT_CHARGE_AUTHORIZE, {
        paymentId: args.paymentId
      }),
      payload,
      paymentService.getHeidelpay().getPrivateKey()
    )

    // New Charge with Hedeipay instance
    const charge = new Charge(paymentService.getHeidelpay())

    // Set charge Id
    charge.setId(response.id)

    // Set resources
    charge
      .getResources()
      .setCustomerId(response.resources.customerId)
      .setMetadataId(response.resources.metadataId)
      .setPaymentId(response.resources.paymentId)
      .setTypeId(response.resources.typeId)
      .setRiskId(response.resources.riskId)

    resolve(charge)
  })
}
