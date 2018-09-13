import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Giropay from '../../../src/payments/types/giropay'

describe('Payment Type GiroPay Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/giropay', {
      id: 's-gro-llany1bnku9e'
    })

    fetchMock.get('end:/types/giropay/s-gro-llany1bnku9e', {
      id: 's-gro-llany1bnku9e',
      method: 'giropay'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create GiroPay payment type', async () => {
    let giropay: Giropay = new Giropay()

    const paymentGiropay: Giropay = await heidelpay.createPaymentType(giropay)

    expect(paymentGiropay.getId()).toEqual('s-gro-llany1bnku9e')
  })

  it('Test Fetch GiroPay payment', async () => {
    let giropay: Giropay = new Giropay()

    const paymentGiropay: Giropay = await heidelpay.createPaymentType(giropay)
    const fetchedGiropay: Giropay = await heidelpay.fetchPaymentType(paymentGiropay.getId())

    expect(fetchedGiropay.getId()).toEqual(paymentGiropay.getId())
  })
})
