import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import WechatPay from '../../../src/payments/types/WechatPay'
import Charge from '../../../src/payments/business/Charge'

describe('Payment Type WechatPay Test', () => {
  let heidelpay: Heidelpay
  const {getCharge} = TestHelper

  const getWechatPay = () => {
    return new WechatPay()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create WechatPay payment type', async () => {
    const wechatPay: WechatPay = await heidelpay.createPaymentType(getWechatPay()) as WechatPay

    expect(wechatPay.getId()).toBeDefined()
  })

  it('Test Charge WechatPay', async () => {
    const wechatPay: WechatPay = await heidelpay.createPaymentType(getWechatPay()) as WechatPay
    const charge: Charge = await heidelpay.charge(getCharge(wechatPay.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch WechatPay payment type', async () => {
    const wechatPay: WechatPay = await heidelpay.createPaymentType(getWechatPay()) as WechatPay
    const fetchWechatPay: WechatPay = await heidelpay.fetchPaymentType(wechatPay.getId()) as WechatPay

    expect(fetchWechatPay.getId()).toEqual(wechatPay.getId())
  })
})
