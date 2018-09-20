import Heidelpay from '../../../src/Heidelpay'
import Charge from '../../../src/payments/business/Charge'
import Cancel from '../../../src/payments/business/Cancel'
import * as TestHelper from '../../helpers/TestHelper'

describe('Cancel after charge test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const {getCharge, getCancelCharge} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test fetch charge with Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const fetchCharge: Charge = await heidelpay.fetchCharge(charge.getResources().getPaymentId(), charge.getId())

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toEqual(fetchCharge.getId())
  })

  it('Test full refund with Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const cancel: Cancel = await heidelpay.cancelCharge(getCancelCharge(charge.getResources().getPaymentId(), charge.getId()))

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
  })

  it('Test full refund with charge', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const fetchCharge: Charge = await heidelpay.fetchCharge(charge.getResources().getPaymentId(), charge.getId())
    const cancel: Cancel = await fetchCharge.cancel()

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
  })

  it('Test partial refund with Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const cancel: Cancel = await heidelpay.cancelCharge(getCancelCharge(charge.getResources().getPaymentId(), charge.getId(), 10))

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
  })

  it('Test partial refund with charge', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const fetchCharge: Charge = await heidelpay.fetchCharge(charge.getResources().getPaymentId(), charge.getId())
    const cancel: Cancel = await fetchCharge.cancel(10)

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
  })
})
