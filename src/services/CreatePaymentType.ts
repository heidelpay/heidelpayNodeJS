import PaymentType from '../payments/types/PaymentType'
import PaymentService from './PaymentService'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'

export default (
  paymentType: AbstractPaymentType,
  paymentService: PaymentService
): Promise<PaymentType> => {
  return new Promise(async resolve => {
    // Call api end point to get response
    const response: any = await paymentService
      .getRequestAdapter()
      .post(
        paymentType.getTypeUrl(),
        paymentType.getPayload(),
        paymentService.getHeidelpay().getPrivateKey()
      )

    // Set Heidelpay instance
    paymentType.setHeidelpay(paymentService.getHeidelpay())

    // Set Payment Id
    paymentType.setId(response.id)

    // Resolve final result
    resolve(paymentType)
  })
}
