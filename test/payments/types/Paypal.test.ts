import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Paypal from '../../../src/payments/types/Paypal'

describe('Payment Type Paypal Test', () => {
  let heidelpay: Heidelpay

  const getPaypal = () => {
    return new Paypal()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Paypal payment type', async () => {
    const Paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal

    expect(Paypal.getId()).toBeDefined()
  })

  it('Test Fetch Paypal payment type', async () => {
    const Paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await heidelpay.fetchPaymentType(Paypal.getId()) as Paypal

    expect(fetchPaypal.getId()).toEqual(Paypal.getId())
  })
})
