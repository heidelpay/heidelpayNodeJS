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
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal

    expect(paypal.getId()).toBeDefined()
  })

  it('Test Fetch Paypal payment type', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await heidelpay.fetchPaymentType(paypal.getId()) as Paypal

    expect(fetchPaypal.getId()).toEqual(paypal.getId())
  })

  it('Test geoLocation', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await heidelpay.fetchPaymentType(paypal.getId()) as Paypal

    expect(paypal.getGeoLocation()).toBeDefined()
    expect(fetchPaypal.getGeoLocation()).toBeDefined()
  })
})
