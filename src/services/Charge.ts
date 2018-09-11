import * as apiURL from '../configs/apiURLs'
import PaymentService from './PaymentService'
import Charge, { chargeObject } from '../payments/business/Charge'

export default (args: chargeObject, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async resolve => {
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

    const response: any = await paymentService
      .getRequestAdapter()
      .post(apiURL.URL_PAYMENT_CHARGE, payload, paymentService.getHeidelpay().getPrivateKey())

    // New Charge with Hedeipay instance
    const charge = new Charge(paymentService.getHeidelpay())

    // Set chargeId
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
