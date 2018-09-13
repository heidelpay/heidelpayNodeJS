import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Paypal from '../../../src/payments/types/Paypal'

describe('Payment Type Paypal Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/paypal', {
      id: 's-ppl-llany1bnku9e'
    })

    fetchMock.get('end:/types/paypal/s-ppl-llany1bnku9e', {
      id: 's-ppl-llany1bnku9e',
      method: 'paypal'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Paypal payment type', async () => {
    let paypal: Paypal = new Paypal()

    const paymentPaypal: Paypal = await heidelpay.createPaymentType(paypal)

    expect(paymentPaypal.getId()).toEqual('s-ppl-llany1bnku9e')
  })

  it('Test Fetch Paypal payment', async () => {
    let paypal: Paypal = new Paypal()

    const paymentPaypal: Paypal = await heidelpay.createPaymentType(paypal)
    const fetchedpaypal: Paypal = await heidelpay.fetchPaymentType(paymentPaypal.getId())

    expect(fetchedpaypal.getId()).toEqual(paymentPaypal.getId())
  })
})
