import Heidelpay from '../../../src/Heidelpay'
import Authorization from '../../../src/payments/business/Authorization'
import Payment from '../../../src/payments/business/Payment'
import * as TestHelper from '../../helpers/TestHelper'

describe('Payment Test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard(true)
    const authorizeObject = TestHelper.getAuthorizationWithOrderId(card)
    const authorize: Authorization = await heidelpay.authorize(authorizeObject)
    const payment: Payment = await heidelpay.fetchPayment(authorize.getResources().getPaymentId()) as Payment

    expect(payment.getResources().getTraceId()).toBeDefined()
  })
})
