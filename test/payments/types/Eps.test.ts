import fetchMock from 'fetch-mock'
import Eps from '../../../src/payments/types/Eps'
import Heidelpay from '../../../src/Heidelpay'

describe('Payment Type Eps Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/eps', {
      id: 's-eps-llany1bnku9e'
    })

    fetchMock.get('end:/types/eps/s-eps-llany1bnku9e', {
      id: 's-eps-llany1bnku9e',
      method: 'eps',
      bankName: 'Test Bank Name'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Eps payment type', async () => {
    let eps: Eps = new Eps()
    eps.setBankName('Test Bank Name')

    const paymentEps: Eps = await heidelpay.createPaymentType(eps)

    expect(paymentEps.getId()).toEqual('s-eps-llany1bnku9e')
  })

  it('Test Fetch Eps payment', async () => {
    let eps: Eps = new Eps()
    eps.setBankName('Test Bank Name')

    const paymentEps: Eps = await heidelpay.createPaymentType(eps)
    const fetchedEps: Eps = await heidelpay.fetchPaymentType(paymentEps.getId())

    expect(fetchedEps.getId()).toEqual('s-eps-llany1bnku9e')
    expect(fetchedEps.getBankName()).toEqual(paymentEps.getBankName())
  })
})
