import * as apiURL from '../configs/apiURLs'
import Card from '../payments/types/Card'
import PaymentType from '../payments/types/PaymentType'
import PaymentService from './PaymentService'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'

export default (
  paymentType: AbstractPaymentType,
  paymentService: PaymentService
): Promise<PaymentType> => {
  return new Promise(async resolve => {
    const response: any = await paymentService
      .getRequestAdapter()
      .post(
        paymentType.getTypeUrl(),
        paymentType.getPayload(),
        paymentService.getHeidelpay().getPrivateKey()
      )

    paymentType.setId(response.id)
    paymentType.setHeidelpay(paymentService.getHeidelpay())

    resolve(paymentType)
  })
}
