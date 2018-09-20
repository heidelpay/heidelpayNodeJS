import PaymentService from './PaymentService'
import Cancel from '../payments/business/Cancel'

export default (args: string, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async resolve => {
    // Call api end point to get response
    const response: any = await paymentService
      .getRequestAdapter()
      .get(args, paymentService.getHeidelpay().getPrivateKey(), true)

    // New Cancel with Hedeipay instance
    let cancel = new Cancel(paymentService.getHeidelpay())

    // Set cancel Id
    cancel.setId(response.id)

    // Set amount of cancel
    cancel.setAmount(response.amount)

    // Set resources
    cancel.setResources(response.resources)

    // Resolve final result
    resolve(cancel)
  })
}
