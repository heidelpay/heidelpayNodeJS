import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import InvoiceSecured from '../../../src/payments/types/InvoiceSecured'

describe('Payment Type InvoiceSecured Test', () => {
  let heidelpay: Heidelpay

  const getInvoiceSecured = () => {
    return new InvoiceSecured()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create InvoiceSecured payment type', async () => {
    const invoiceSecured: InvoiceSecured = await heidelpay.createPaymentType(getInvoiceSecured()) as InvoiceSecured

    expect(invoiceSecured.getId()).toBeDefined()
  })

  it('Test Fetch InvoiceSecured payment type', async () => {
    const invoiceSecured: InvoiceSecured = await heidelpay.createPaymentType(getInvoiceSecured()) as InvoiceSecured
    const fetchInvoiceSecured: InvoiceSecured = await heidelpay.fetchPaymentType(invoiceSecured.getId()) as InvoiceSecured

    expect(fetchInvoiceSecured.getId()).toEqual(invoiceSecured.getId())
  })

  it('should return an invoiceId if invoiceId is set', async () => {
    const invoiceSecured: InvoiceSecured = await heidelpay.createPaymentType(getInvoiceSecured()) as InvoiceSecured
    invoiceSecured.setInvoiceId('invoice123')

    expect(invoiceSecured.getInvoiceId()).toBe('invoice123')
    expect(invoiceSecured.getPayload()).toHaveProperty('invoiceId', 'invoice123')
  })


  it('should return an empty object if invoiceId is not set', async () => {
    const invoiceSecured: InvoiceSecured = await heidelpay.createPaymentType(getInvoiceSecured()) as InvoiceSecured

    expect(invoiceSecured.getPayload().invoiceId).toBe(undefined)
    expect(invoiceSecured.getPayload()).toEqual({})
  })

  it('Test geoLocation', async () => {
    const invoiceSecured: InvoiceSecured = await heidelpay.createPaymentType(getInvoiceSecured()) as InvoiceSecured
    const fetchInvoiceSecured: InvoiceSecured = await heidelpay.fetchPaymentType(invoiceSecured.getId()) as InvoiceSecured

    expect(invoiceSecured.getGeoLocation()).toBeDefined()
    expect(fetchInvoiceSecured.getGeoLocation()).toBeDefined()
  })
})
