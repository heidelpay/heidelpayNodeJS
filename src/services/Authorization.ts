import * as apiURL from '../configs/apiURLs'
import PaymentService from './PaymentService'
import Authorization, { authorizeObject } from '../payments/business/Authorization'

export default (args: authorizeObject, paymentService: PaymentService): Promise<Authorization> => {
  return new Promise(async resolve => {
    const { amount, currency, typeId, customerId, returnUrl } = args
    let payload: any = {
      amount: amount,
      currency: currency,
      resources: {
        typeId: typeId
      }
    }

    if (customerId) {
      payload.resources.customerId = customerId
    }

    if (returnUrl) {
      payload.returnUrl = returnUrl
    }

    const response: any = await paymentService
      .getRequestAdapter()
      .post(apiURL.URL_PAYMENT_AUTHORIZE, payload, paymentService.getHeidelpay().getPrivateKey())

    // New Authorize with Hedeipay instance
    const authorize = new Authorization(paymentService.getHeidelpay())

    // Set authorizeId
    authorize.setId(response.id)

    // Set resources
    authorize
      .getResources()
      .setCustomerId(response.resources.customerId)
      .setMetadataId(response.resources.metadataId)
      .setPaymentId(response.resources.paymentId)
      .setTypeId(response.resources.typeId)
      .setRiskId(response.resources.riskId)

    resolve(authorize)
  })
}
