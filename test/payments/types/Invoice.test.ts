import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Invoice from '../../../src/payments/types/Invoice'

describe('Payment Type Invoice Test', () => {
  let heidelpay: Heidelpay

  const getInvoice = () => {
    return new Invoice()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create Invoice payment type', async () => {
    const invoice: Invoice = await heidelpay.createPaymentType(getInvoice()) as Invoice

    expect(invoice.getId()).toBeDefined()
  })

  it('Test Fetch Invoice payment type', async () => {
    const invoice: Invoice = await heidelpay.createPaymentType(getInvoice()) as Invoice
    const fetchInvoice: Invoice = await heidelpay.fetchPaymentType(invoice.getId()) as Invoice

    expect(fetchInvoice.getId()).toEqual(invoice.getId())
  })
})
