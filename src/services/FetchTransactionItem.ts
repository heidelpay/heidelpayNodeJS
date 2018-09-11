import TransactionItem from '../payments/TransactionItem'
import PaymentService from './PaymentService'
import Authorization from '../payments/business/Authorization'
import AbstractPayment from '../payments/business/AbstractPayment'

export default (
  transactionItem: TransactionItem,
  paymentService: PaymentService
): Promise<AbstractPayment> => {
  return new Promise(async resolve => {
    const response = await paymentService
      .getRequestAdapter()
      .get(transactionItem.getUrl(), paymentService.getHeidelpay().getPrivateKey(), true)

    // New Authorize with Hedeipay instance
    const authorize = new Authorization(paymentService.getHeidelpay())

    resolve(authorize)
  })
}
