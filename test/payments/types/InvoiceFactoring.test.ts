import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import InvoiceFactoring from '../../../src/payments/types/InvoiceFactoring'

describe('Payment Type InvoiceFactoring Test', () => {
  let heidelpay: Heidelpay

  const getInvoiceFactoring = () => {
    return new InvoiceFactoring()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create InvoiceFactoring payment type', async () => {
    const invoiceFactoring: InvoiceFactoring = await heidelpay.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring

    expect(invoiceFactoring.getId()).toBeDefined()
  })

  it('Test Fetch InvoiceFactoring payment type', async () => {
    const invoiceFactoring: InvoiceFactoring = await heidelpay.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring
    const fetchInvoiceFactoring: InvoiceFactoring = await heidelpay.fetchPaymentType(invoiceFactoring.getId()) as InvoiceFactoring

    expect(fetchInvoiceFactoring.getId()).toEqual(invoiceFactoring.getId())
  })

  it('should return an invoiceId if invoiceId is set', async () => {
    const invoiceFactoring: InvoiceFactoring = await heidelpay.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring
    invoiceFactoring.setInvoiceId('invoice123')

    expect(invoiceFactoring.getInvoiceId()).toBe('invoice123')
    expect(invoiceFactoring.getPayload()).toHaveProperty('invoiceId', 'invoice123')
  })

  it('should return an empty object if invoiceId is not set', async () => {
    const invoiceFactoring: InvoiceFactoring = await heidelpay.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring

    expect(invoiceFactoring.getPayload().invoiceId).toBe(undefined)
    expect(invoiceFactoring.getPayload()).toEqual({})
  })

  it('Test geoLocation', async () => {
    const invoiceFactoring: InvoiceFactoring = await heidelpay.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring
    const fetchInvoiceFactoring: InvoiceFactoring = await heidelpay.fetchPaymentType(invoiceFactoring.getId()) as InvoiceFactoring

    expect(invoiceFactoring.getGeoLocation()).toBeDefined()
    expect(fetchInvoiceFactoring.getGeoLocation()).toBeDefined()
  })
})
