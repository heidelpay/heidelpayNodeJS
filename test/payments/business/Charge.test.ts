import Heidelpay from '../../../src/Heidelpay'
import Charge  from '../../../src/payments/business/Charge'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'

describe('Charge test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard, createCustomer
  const {getCharge} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
    createCustomer = TestHelper.createCustomer(heidelpay)
  })

  it('Test charge with typeId', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))

    expect(charge.getId()).toBeDefined()
  })

  it('Test charge with payment type', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card))

    expect(charge.getId()).toBeDefined()
  })

  it('Test charge with customer', async () => {
    const card = await createPaymentTypeCard()
    const customer = await createCustomer(true) as Customer

    const charge: Charge = await heidelpay.charge(getCharge(card, customer))
    expect(charge.getId()).toBeDefined()
    expect(charge.getResources().getCustomerId()).toBeDefined()
    expect(charge.getResources().getMetadataId()).toBeDefined()
    expect(charge.getResources().getPaymentId()).toBeDefined()
    // expect(charge.getResources().getRiskId()).toBeDefined()
    expect(charge.getResources().getTypeId()).toBeDefined()
  })

  it('Test charge with customer Id', async () => {
    const card = await createPaymentTypeCard(true)
    const customer = await createCustomer(true) as Customer

    const charge: Charge = await heidelpay.charge(getCharge(card, customer.getCustomerId()))
    expect(charge.getId()).toBeDefined()
  })

  it('Test charge with return payment', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card))

    expect(charge.getId()).toBeDefined()
    expect(charge.getPayment()).toBeDefined()
    expect(charge.getPayment().getId()).toBeDefined()
  })
})
