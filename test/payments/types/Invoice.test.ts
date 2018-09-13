import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Invoice from '../../../src/payments/types/Invoice'

describe('Payment Type Invoice Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/invoice', {
      id: 's-ivc-llany1bnku9e'
    })

    fetchMock.get('end:/types/invoice/s-ivc-llany1bnku9e', {
      id: 's-ivc-llany1bnku9e',
      method: 'invoice'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Invoice payment type', async () => {
    let invoice: Invoice = new Invoice()

    const paymentInvoice: Invoice = await heidelpay.createPaymentType(invoice)

    expect(paymentInvoice.getId()).toEqual('s-ivc-llany1bnku9e')
  })

  it('Test Fetch Invoice payment', async () => {
    let invoice: Invoice = new Invoice()

    const paymentInvoice: Invoice = await heidelpay.createPaymentType(invoice)
    const fetchedGiropay: Invoice = await heidelpay.fetchPaymentType(paymentInvoice.getId())

    expect(fetchedGiropay.getId()).toEqual(paymentInvoice.getId())
  })
})
