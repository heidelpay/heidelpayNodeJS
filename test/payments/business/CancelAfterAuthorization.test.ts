import Heidelpay from '../../../src/Heidelpay'
import Authorization from '../../../src/payments/business/Authorization'
import Cancel from '../../../src/payments/business/Cancel'
import * as TestHelper from '../../helpers/TestHelper'

describe('Cancel after authorize test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const {getAuthorization, getCancelAuthorization} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test fetch authorization', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const authorization: Authorization = await heidelpay.fetchAuthorization(authorize.getResources().getPaymentId())

    expect(authorization).toBeInstanceOf(Authorization)
  })

  it('Test Full cancel (reversal) after authorize', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorize.cancel()

    expect(cancelAuthorize).toBeInstanceOf(Cancel)
    expect(cancelAuthorize.getId()).toBeDefined()
  })

  it('Test reversal partial after authorize', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorize.cancel(50)

    expect(cancelAuthorize).toBeInstanceOf(Cancel)
    expect(cancelAuthorize.getAmount()).toEqual("50.0000")
  })

  it('Test reversal partial after authorize with Heidelpay', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await heidelpay.cancelAuthorization(getCancelAuthorization(authorize.getResources().getPaymentId(), authorize.getId(), 50))

    expect(cancelAuthorize).toBeInstanceOf(Cancel)
    expect(cancelAuthorize.getAmount()).toEqual("50.0000")
  })

  it('Test fetch cancel with Heidelpay', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await heidelpay.cancelAuthorization({
      amount: 50,
      authorizationId: authorize.getId(),
      paymentId: authorize.getResources().getPaymentId()
    })

    const cancel: Cancel = await heidelpay.fetchCancel(authorize.getResources().getPaymentId(), cancelAuthorize.getId());
    expect(cancel.getId()).toBeDefined()
  })

  it('Test fetch cancel by refund Id with Heidelpay', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await heidelpay.cancelAuthorization({
      amount: 50,
      authorizationId: authorize.getId(),
      paymentId: authorize.getResources().getPaymentId()
    })

    const cancel: Cancel = await heidelpay.fetchCancel(authorize.getResources().getPaymentId(), cancelAuthorize.getId(), authorize.getId());
    expect(cancel.getId()).toBeDefined()
  })
})
