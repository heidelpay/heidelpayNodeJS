import Heidelpay from '../../../src/Heidelpay'
import Authorization from '../../../src/payments/business/Authorization'
import Card from '../../../src/payments/types/Card'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'
import Payment from '../../../src/payments/business/Payment'

describe('Authorize test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard, createCustomer
  const { getAuthorization, getAuthorizationWithOrderId } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
    createCustomer = CustomerTestHelper.createCustomer(heidelpay)
  })

  it('Test authorize with authorize payload object', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getAmount()).toBeDefined()
    expect(authorize.getCurrency()).toBeDefined()
    expect(authorize.getReturnUrl()).toBeDefined()
    expect(authorize.getProcessing().getShortId()).toBeDefined()
    expect(authorize.getProcessing().getUniqueId()).toBeDefined()
    expect(authorize.getResources()).toBeDefined()
    expect(authorize.getPaymentReference()).toBeDefined()
    expect(authorize.getPayload()).toBeDefined()
  })

  it('Test authorize with payment type Card and Order Id', async () => {
    const card = await createPaymentTypeCard(true)
    const authorizeObject = getAuthorizationWithOrderId(card)
    const authorize: Authorization = await heidelpay.authorize(authorizeObject)
    const payment: Payment = await heidelpay.fetchPayment(authorize.getResources().getPaymentId()) as Payment

    expect(authorize.getOrderId()).toEqual(authorizeObject.orderId)
    expect(payment.getResources()).toBeDefined()
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getResources()).toBeDefined()
    expect(authorize.getPayload()).toBeDefined()
  })

  it('Test authorize with payment type Card', async () => {
    const card = await createPaymentTypeCard(true)

    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card))
    const payment: Payment = await heidelpay.fetchPayment(authorize.getResources().getPaymentId()) as Payment

    expect(payment.getResources()).toBeDefined()
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getResources()).toBeDefined()
    expect(authorize.getPayload()).toBeDefined()
  })

  it('Test authorize with customer', async () => {
    const customer = await createCustomer(true) as Customer
    const card = await createPaymentTypeCard() as Card

    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId(), customer))
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getPayload()).toBeDefined()
  })
  it('Test authorize with customer Id', async () => {
    const customer = await createCustomer() as Customer
    const card = await createPaymentTypeCard() as Card

    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId(), customer.getCustomerId()))
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getPayload()).toBeDefined()
  })
})
