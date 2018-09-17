import PaymentService from './PaymentService'
import Cancel from '../payments/business/Cancel'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'
import AbstractPayment from '../payments/business/AbstractPayment'

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

    // Mapper resources
    cancel = ResponseResourceMapper(cancel as AbstractPayment, response.resources) as Cancel

    // Resolve final result
    resolve(cancel)
  })
}
