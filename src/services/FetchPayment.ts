import * as apiURL from '../configs/apiURLs'
import * as Utils from '../utils/Utils'
import Payment from '../payments/business/Payment'
import TransactionItem from '../payments/TransactionItem'
import PaymentService from './PaymentService'

export default (paymentId: string, paymentService: PaymentService): Promise<Payment> => {
  return new Promise(async (resolve, reject) => {
    const response: any = await paymentService.getRequestAdapter().get(
      Utils.replaceUrl(apiURL.URL_PAYMENT_FETCH, {
        paymentId: paymentId
      }),
      paymentService.getHeidelpay().getPrivateKey()
    )

    if (response.errors) {
      return reject(response.errors)
    }

    // New Payment with Hedeipay instance
    const payment = new Payment(paymentService.getHeidelpay())

    // Set payment Id
    payment.setId(response.id)

    // Set resources
    payment
      .getResources()
      .setCustomerId(response.resources.customerId)
      .setMetadataId(response.resources.metadataId)
      .setPaymentId(response.resources.paymentId)
      .setTypeId(response.resources.typeId)
      .setRiskId(response.resources.riskId)

    const listTransaction: any = []

    response.transactions.map((item: any) => {
      const transactionItem: TransactionItem = new TransactionItem(paymentService.getHeidelpay())

      transactionItem
        .setDate(item.date)
        .setType(item.type)
        .setUrl(item.url)
        .setAmount(item.amount)

      listTransaction.push(transactionItem)
    })

    // Set list transaction in payment object
    payment.getTransactions().setList(listTransaction)

    resolve(payment)
  })
}
