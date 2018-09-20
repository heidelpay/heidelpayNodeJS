import Card from '../../../src/payments/types/Card'
import Heidelpay from '../../../src/Heidelpay'
import Authorization  from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'
import * as TestHelper from '../../helpers/TestHelper'

describe('Payment Type Card Test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const {getAuthorization, getCharge} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test Create card with merchant NOT PCI DSS Compliant', async () => {
    const card = await createPaymentTypeCard()

    expect(card.getId()).toBeDefined()
  })

  it('Test Authorize card type', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorize: Authorization = await card.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
  })

  it('Test Authorize card with customer Id', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorize: Authorization = await card.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getPayment()).toBeDefined()
  })

  it('Test Charge card type', async () => {
    const card: Card = await createPaymentTypeCard()
    const charge: Charge = await card.charge(getCharge(card.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch card type', async () => {
    const card: Card = await createPaymentTypeCard()
    const fetchedCard: Card = await heidelpay.fetchPaymentType(card.getId()) as Card

    expect(card.getId()).toEqual(fetchedCard.getId())
    expect(card.getPanNumber()).toBeDefined()
    expect(card.getCVC()).toBeDefined()
    expect(card.getExpiryDate()).toEqual(fetchedCard.getExpiryDate())
  })
})
