import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Alipay from '../../../src/payments/types/Alipay'
import Charge from '../../../src/payments/business/Charge'

describe('Payment Type Alipay Test', () => {
  let heidelpay: Heidelpay
  const {getCharge} = TestHelper

  const getAlipay = () => {
    return new Alipay()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Alipay payment type', async () => {
    const alipay: Alipay = await heidelpay.createPaymentType(getAlipay()) as Alipay

    expect(alipay.getId()).toBeDefined()
  })

  it('Test Charge Alipay', async () => {
    const alipay: Alipay = await heidelpay.createPaymentType(getAlipay()) as Alipay
    const charge: Charge = await heidelpay.charge(getCharge(alipay.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch Alipay payment type', async () => {
    const alipay: Alipay = await heidelpay.createPaymentType(getAlipay()) as Alipay
    const fetchAlipay: Alipay = await heidelpay.fetchPaymentType(alipay.getId()) as Alipay

    expect(fetchAlipay.getId()).toEqual(alipay.getId())
  })
})
