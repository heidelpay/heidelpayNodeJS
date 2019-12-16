import Heidelpay from '../../../src/Heidelpay'
import Charge from '../../../src/payments/business/Charge'
import Shipment from '../../../src/payments/business/Shipment'
import Basket from '../../../src/payments/Basket'
import InvoiceGuaranteed from '../../../src/payments/types/InvoiceGuaranteed'
import InvoiceFactoring from '../../../src/payments/types/InvoiceFactoring'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'

describe('Authorize test', () => {
  let heidelpay: Heidelpay
  const { getCharge, getChargeWithBasketId, getShipmentOrderAndInvoiceId, createBasket } = TestHelper

  const getInvoiceGuaranteed = () => {
    return new InvoiceGuaranteed()
  }

  const getInvoiceFactoring = () => {
    return new InvoiceFactoring()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test shipment with payment type InvoiceGuaranteed', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed    
    const customer: Customer = await heidelpay.createCustomer(CustomerTestHelper.createFullCustomer())
    const charge: Charge = await heidelpay.charge(getCharge(invoiceGuaranteed.getId(), customer.getCustomerId()))

    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await heidelpay.shipment(paymentId, getShipmentOrderAndInvoiceId())
    
    expect(shipment.getOrderId()).toBeDefined()
    expect(shipment.getInvoiceId()).toBeDefined()
  })

  it('Test shipment with payment type InvoiceGuaranteed', async () => {
    const invoiceFactoring: InvoiceFactoring = await heidelpay.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring
    const customer: Customer = await heidelpay.createCustomer(CustomerTestHelper.createFullCustomer())
    const basket: Basket = await heidelpay.createBasket(createBasket())
    const basketId = basket.getId()
    const charge: Charge = await heidelpay.charge(getChargeWithBasketId(invoiceFactoring.getId(), customer.getCustomerId(), basketId))
    
    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await heidelpay.shipment(paymentId, getShipmentOrderAndInvoiceId())

    expect(shipment.getOrderId()).toBeDefined()
    expect(shipment.getInvoiceId()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await heidelpay.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed
    const customer: Customer = await heidelpay.createCustomer(CustomerTestHelper.createFullCustomer())
    const charge: Charge = await heidelpay.charge(getCharge(invoiceGuaranteed.getId(), customer.getCustomerId()))

    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await heidelpay.shipment(paymentId, getShipmentOrderAndInvoiceId())

    expect(shipment.getResources().getTraceId()).toBeDefined()
  })
})
