import * as Utils from '../utils/Utils'
import PaymentType from '../payments/types/PaymentType'
import PaymentService from './PaymentService'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'

export default (typeId: string, paymentService: PaymentService): Promise<PaymentType> => {
  return new Promise(async resolve => {
    const paymentType: AbstractPaymentType = Utils.getPaymentTypeFromTypeId(typeId)
    paymentType.setHeidelpay(paymentService.getHeidelpay())
    const requestUrl = Utils.replaceUrl(paymentType.getFetchTypeUrl(), { typeId: typeId })

    const response: any = await paymentService
      .getRequestAdapter()
      .get(requestUrl, paymentService.getHeidelpay().getPrivateKey())

    resolve(Utils.mapResponsePaymentType(response))
  })
}
