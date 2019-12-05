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
    heidelpay = TestHelper.createHeidelpayInstance()
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

  it('should return an invoiceId if invoiceId is set', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed
    invoiceGuaranteed.setInvoiceId('invoice123')

    expect(invoiceGuaranteed.getInvoiceId()).toBe('invoice123')
    expect(invoiceGuaranteed.getPayload()).toHaveProperty('invoiceId', 'invoice123')
  })


  it('should return an empty object if invoiceId is not set', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed

    expect(invoiceGuaranteed.getPayload().invoiceId).toBe(undefined)
    expect(invoiceGuaranteed.getPayload()).toEqual({})
  })

  it('Test geoLocation', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed
    const fetchInvoiceGuaranteed: InvoiceGuaranteed = await heidelpay.fetchPaymentType(invoiceGuaranteed.getId()) as InvoiceGuaranteed

    expect(invoiceGuaranteed.getGeoLocation()).toBeDefined()
    expect(fetchInvoiceGuaranteed.getGeoLocation()).toBeDefined()
  })
})
