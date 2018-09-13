import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Przelewy24 from '../../../src/payments/types/Przelewy24'

describe('Payment Type Przelewy Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/przelewy24', {
      id: 's-p24-llany1bnku9e'
    })

    fetchMock.get('end:/types/przelewy24/s-p24-llany1bnku9e', {
      id: 's-p24-llany1bnku9e',
      method: 'przelewy24'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Przelewy payment type', async () => {
    let przelewy24: Przelewy24 = new Przelewy24()

    const paymentPrzelewy24: Przelewy24 = await heidelpay.createPaymentType(przelewy24)

    expect(paymentPrzelewy24.getId()).toEqual('s-p24-llany1bnku9e')
  })

  it('Test Fetch Przelewy payment', async () => {
    let przelewy24: Przelewy24 = new Przelewy24()

    const paymentPrzelewy24: Przelewy24 = await heidelpay.createPaymentType(przelewy24)
    const fetchedPrzelewy24: Przelewy24 = await heidelpay.fetchPaymentType(
      paymentPrzelewy24.getId()
    )

    expect(fetchedPrzelewy24.getId()).toEqual(paymentPrzelewy24.getId())
  })
})
