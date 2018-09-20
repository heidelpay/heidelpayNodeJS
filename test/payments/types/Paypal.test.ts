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
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create Paypal payment type', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal

    expect(paypal.getId()).toBeDefined()
  })

  it('Test Fetch Paypal payment type', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await heidelpay.fetchPaymentType(paypal.getId()) as Paypal

    expect(fetchPaypal.getId()).toEqual(paypal.getId())
  })
})
