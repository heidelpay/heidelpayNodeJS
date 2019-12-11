import Heidelpay from '../../../src/Heidelpay'
import Authorization from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'
import * as TestHelper from '../../helpers/TestHelper'

describe('Charge after authorize test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const { getChargeAuthorization, getAuthorization } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test fetch authorization', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const fetchAuthorize: Authorization = await heidelpay.fetchAuthorization(authorize.getResources().getPaymentId())

    expect(fetchAuthorize).toBeInstanceOf(Authorization)
  })

  it('Test full charge after authorization', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const charge: Charge = await authorize.charge()

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
  })

  it('Test partial charge after authorization', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const charge: Charge = await authorize.charge(50)

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
  })

  it('Test full charge after authorization with Heidelpay', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const charge: Charge = await heidelpay.chargeAuthorization(getChargeAuthorization(authorize.getResources().getPaymentId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
  })

  it('Test partial charge after authorization with Heidelpay', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const charge: Charge = await heidelpay.chargeAuthorization(getChargeAuthorization(authorize.getResources().getPaymentId(), 50))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))
    const charge: Charge = await heidelpay.chargeAuthorization(getChargeAuthorization(authorize.getResources().getPaymentId(), 50))
    
    expect(charge.getResources().getTraceId()).toBeDefined()
  })
})
