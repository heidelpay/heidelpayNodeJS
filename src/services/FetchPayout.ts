import PaymentService from './PaymentService'
import Payout from '../payments/business/Payout'

export default (args: string, paymentService: PaymentService): Promise<Payout> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(args, paymentService.getHeidelpay().getPrivateKey(), true)

      // New payout with Hedeipay instance
      let payout = new Payout(paymentService.getHeidelpay())

      // Set payout Id
      payout.setId(response.id)

      // Set order Id
      if(response.orderId) {
        payout.setOrderId(response.orderId)
      }

      // Set payment reference
      if(response.paymentReference) {
        payout.setPaymentReference(response.paymentReference)
      }

      // Set amount of payout
      payout.setAmount(response.amount)

      // Set currency
      payout.setCurrency(response.currency)

      // Set return URL
      payout.setReturnUrl(response.returnUrl)

      // Set resources
      payout.setResources(response.resources)

      // Set Processing
      payout.setProcessing(response.processing)

      // Set payload
      payout.setPayload(response)

      // Resolve final result
      resolve(payout)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
