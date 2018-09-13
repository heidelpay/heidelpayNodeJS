import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Prepayment from '../../../src/payments/types/prepayment'

describe('Payment Type Prepayment Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/prepayment', {
      id: 's-ppy-llany1bnku9e'
    })

    fetchMock.get('end:/types/prepayment/s-ppy-llany1bnku9e', {
      id: 's-ppy-llany1bnku9e',
      method: 'prepayment'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Prepayment payment type', async () => {
    let prepayment: Prepayment = new Prepayment()

    const paymentPrepayment: Prepayment = await heidelpay.createPaymentType(prepayment)

    expect(paymentPrepayment.getId()).toEqual('s-ppy-llany1bnku9e')
  })

  it('Test Fetch Prepayment payment', async () => {
    let prepayment: Prepayment = new Prepayment()

    const paymentPrepayment: Prepayment = await heidelpay.createPaymentType(prepayment)
    const fetchedPrzelewy24: Prepayment = await heidelpay.fetchPaymentType(
      paymentPrepayment.getId()
    )

    expect(fetchedPrzelewy24.getId()).toEqual(paymentPrepayment.getId())
  })
})
