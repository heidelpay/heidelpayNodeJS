import * as apiURL from '../configs/ApiUrls'
import Payment from '../payments/business/Payment'
import TransactionItem from '../payments/TransactionItem'
import PaymentService from './PaymentService'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'
import AbstractPayment from '../payments/business/AbstractPayment'

export default (paymentId: string, paymentService: PaymentService): Promise<Payment> => {
  return new Promise(async (resolve, reject) => {
    // Call api end point to get response
    const response: any = await paymentService
      .getRequestAdapter()
      .get(`${apiURL.URL_PAYMENT}/${paymentId}`, paymentService.getHeidelpay().getPrivateKey())

    // Handle error responses
    if (response.errors) {
      return reject(response.errors)
    }

    // New Payment with Hedeipay instance
    let payment = new Payment(paymentService.getHeidelpay())

    // Set payment Id
    payment.setId(response.id)

    // Mapper resources
    payment = ResponseResourceMapper(payment as AbstractPayment, response.resources) as Payment

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

    // Resolve final result
    resolve(payment)
  })
}
