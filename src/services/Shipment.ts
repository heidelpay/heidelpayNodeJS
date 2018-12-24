import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';
import Shipment from '../payments/business/Shipment';
import * as Utils from '../utils/Utils'

export default (paymentId: string, paymentService: PaymentService): Promise<Shipment> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService.getRequestAdapter().post(
        Utils.replaceUrl(apiURL.URL_PAYMENT_SHIPMENT, {
          paymentId: paymentId,
        }),
        {},
        paymentService.getHeidelpay().getPrivateKey()
      )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Shipment with Hedeipay instance
      let shipment = new Shipment(paymentService.getHeidelpay())

      // Set shipment Id
      shipment.setId(response.id)

      // Set amount of charge
      shipment.setAmount(response.amount)

      // Set order Id
      if(response.orderId) {
        shipment.setOrderId(response.orderId)
      }

      // Set resources
      shipment.setResources(response.resources)

      // Set Processing
      shipment.setProcessing(response.processing)

      // Set Payload
      shipment.setPayload(response)

      // Resolve final result
      resolve(shipment)
    } catch (error) {
      // Reject with error object
      return reject(error)
    }
  })
}
