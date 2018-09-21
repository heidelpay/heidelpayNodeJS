import Heidelpay from '../../../src/Heidelpay'
import Charge from '../../../src/payments/business/Charge'
import Cancel from '../../../src/payments/business/Cancel'
import * as TestHelper from '../../helpers/TestHelper'
import Card from '../../../src/payments/types/Card';
import Authorization from '../../../src/payments/business/Authorization';

describe('Cancel test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const {getCharge, getAuthorization} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test fetch cancel authorize with Heidelpay', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorization: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorization.cancel()
    const cancel: Cancel = await heidelpay.fetchCancel(authorization.getResources().getPaymentId(), cancelAuthorize.getId(), authorization.getId());

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toEqual(cancelAuthorize.getId())
  })

  it('Test fetch cancel authorize with Payment', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorization: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorization.cancel()
    const cancelList: Array<Cancel> = cancelAuthorize.getPayment().getCancelList()

    expect(cancelList.length).toEqual(1)
  })

  it('Test fetch cancel charge with Heidelpay', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const cancelCharge: Cancel = await charge.cancel()
    const cancel: Cancel = await heidelpay.fetchCancel(cancelCharge.getResources().getPaymentId(), cancelCharge.getId(), charge.getId());

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toEqual(cancelCharge.getId())
  })

  it('Test fetch cancel charge with Payment', async () => {
    const card: Card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getCharge(card.getId()))
    const cancelCharge: Cancel = await charge.cancel()

    const fetchCharge = await heidelpay.fetchCharge(charge.getResources().getPaymentId(), charge.getId())

    const cancel: Cancel = fetchCharge.getCancel(cancelCharge.getId())
    const cancelList: Array<Cancel> = cancelCharge.getPayment().getCancelList()

    expect(cancel.getId()).toEqual(cancelCharge.getId())
    expect(cancelList.length).toEqual(1)
  })
})
