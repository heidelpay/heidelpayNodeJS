import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import InvoiceGuaranteed from '../../../src/payments/types/InvoiceGuaranteed'

describe('Payment Type InvoiceGuaranteed Test', () => {
  let heidelpay: Heidelpay

  const getInvoiceGuaranteed = () => {
    return new InvoiceGuaranteed()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create InvoiceGuaranteed payment type', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed

    expect(invoiceGuaranteed.getId()).toBeDefined()
  })

  it('Test Fetch InvoiceGuaranteed payment type', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed
    const fetchInvoiceGuaranteed: InvoiceGuaranteed = await heidelpay.fetchPaymentType(invoiceGuaranteed.getId()) as InvoiceGuaranteed

    expect(fetchInvoiceGuaranteed.getId()).toEqual(invoiceGuaranteed.getId())
  })
})
