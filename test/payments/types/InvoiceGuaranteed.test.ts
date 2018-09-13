import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Invoice from '../../../src/payments/types/Invoice'
import InvoiceGuaranteed from '../../../src/payments/types/InvoiceGuaranteed'

describe('Payment Type Invoice Guaranteed Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/invoice-guaranteed', {
      id: 's-ivg-llany1bnku9e'
    })

    fetchMock.get('end:/types/invoice-guaranteed/s-ivg-llany1bnku9e', {
      id: 's-ivg-llany1bnku9e',
      method: 'invoice-guaranteed'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Invoice Guaranteed payment type', async () => {
    let invoice: InvoiceGuaranteed = new InvoiceGuaranteed()

    const paymentInvoice: Invoice = await heidelpay.createPaymentType(invoice)

    expect(paymentInvoice.getId()).toEqual('s-ivg-llany1bnku9e')
  })

  it('Test Fetch Invoice Guaranteed payment', async () => {
    let invoice: InvoiceGuaranteed = new InvoiceGuaranteed()

    const paymentInvoice: InvoiceGuaranteed = await heidelpay.createPaymentType(invoice)
    const fetchedGiropay: InvoiceGuaranteed = await heidelpay.fetchPaymentType(
      paymentInvoice.getId()
    )

    expect(fetchedGiropay.getId()).toEqual(paymentInvoice.getId())
  })
})
