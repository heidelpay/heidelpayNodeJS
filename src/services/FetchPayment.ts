import * as apiURL from '../configs/ApiUrls'
import Payment from '../payments/business/Payment'
import PaymentService from './PaymentService'
import ResponseResourceMapper from './mappers/ResponseResourceMapper'
import AbstractPayment from '../payments/business/AbstractPayment'
import Authorization from '../payments/business/Authorization'
import { getRefundIdOfCancel } from '../utils/Utils'
import AuthorizationService from './Authorization'
import ChargeService from './Charge'
import CancelService from './Cancel'
import Charge from '../payments/business/Charge'
import Cancel from '../payments/business/Cancel'

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

    // Fetch authorization transaction and set to payment object
    const authorization: Authorization = await _getAuthorization(
      response.transactions,
      paymentService
    )
    payment.setAuthorization(authorization)

    // Fetch charge list transaction and set to payment object
    const chargeList: Array<Charge> = await _getChargeList(response.transactions, paymentService)
    payment.setChargeList(chargeList)

    // Fetch cancel list transaction and set to payment object
    const canceList: Array<Cancel> = await _getCancelList(response.transactions, paymentService)
    payment.setCancelList(canceList)

    // Resolve final result
    resolve(payment)
  })
}

const _getAuthorization = (
  transactions: any,
  paymentService: PaymentService
): Promise<Authorization> => {
  return new Promise(async resolve => {
    // Find transaction authorize in list of transactions
    const authorizeItem = transactions.find((item: any) => item.type === 'authorize')

    // Call Authorization service to fetch transaction
    const authorization: Authorization = await AuthorizationService(
      authorizeItem.url,
      paymentService
    )

    // Resolve final result
    resolve(authorization)
  })
}

const _getChargeList = (
  transactions: any,
  paymentService: PaymentService
): Promise<Array<Charge>> => {
  return new Promise(async resolve => {
    // Find charge list in list of transactions
    const chargeListItem = transactions.filter((item: any) => item.type === 'charge')
    const chargeList: Array<Charge> = []

    const promiseCharge = chargeListItem.map(async (item: any) => {
      // Call Charge service to fetch transaction
      const charge: Charge = await ChargeService(item.url, paymentService)

      // Push charge instance to chargeList array
      chargeList.push(charge)
    })

    // Await util charge service fetch done
    await Promise.all(promiseCharge)

    // Resolve final result
    resolve(chargeList)
  })
}

const _getCancelList = (
  transactions: any,
  paymentService: PaymentService
): Promise<Array<Cancel>> => {
  return new Promise(async resolve => {
    // Find charge list in list of transactions
    const cancelListItem = transactions.filter(
      (item: any) => item.type === 'cancel' || item.type === 'cancel-charge'
    )
    const cancelList: Array<Cancel> = []

    const promiseCancel = cancelListItem.map(async (item: any) => {
      // Call Charge service to fetch transaction
      const cancel: Cancel = await CancelService(item.url, paymentService)

      // Get refund Id from cancel url
      const refundId = getRefundIdOfCancel(item.url)

      // Set refund Id of cancel
      cancel.setRefundId(refundId)

      // Push charge instance to cancelList array
      cancelList.push(cancel)
    })

    // Await util charge service fetch done
    await Promise.all(promiseCancel)

    // Resolve final result
    resolve(cancelList)
  })
}
