import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import SepaDirectDebitGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'
import Shipment from '../../../src/payments/business/Shipment';
import Charge from '../../../src/payments/business/Charge';
import { Customer } from '../../../src/payments/Customer';

describe('Payment Type SepaDirectDebitGuaranteed Test', () => {
  let heidelpay: Heidelpay
  const { getCharge, createFullCustomer } = TestHelper

  const getSSDConstructor = () => {
    return new SepaDirectDebitGuaranteed("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  const getSSD = () => {
    return new SepaDirectDebitGuaranteed()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create SepaDirectDebitGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(getSSDConstructor()) as SepaDirectDebitGuaranteed

    expect(ssd.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebitGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed
    const fetchSepaDirectDebitGuaranteed: SepaDirectDebitGuaranteed = await heidelpay.fetchPaymentType(ssd.getId()) as SepaDirectDebitGuaranteed

    expect(fetchSepaDirectDebitGuaranteed.getId()).toEqual(ssd.getId())
  })

  it('Test Shipment SepaDirectDebitGuaranteed', async () => {
    try {
      const ssd: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed
      const customer: Customer = await heidelpay.createCustomer(createFullCustomer())
  
      const charge: Charge = await heidelpay.charge(getCharge(ssd.getId(), customer.getCustomerId()))
      const shipment: Shipment = await heidelpay.shipment(charge.getResources().getPaymentId())
  
      expect(shipment).toBeInstanceOf(Shipment)
      expect(shipment.getId()).toBeDefined()
      expect(shipment.getAmount()).toBeDefined()
      expect(shipment.getProcessing()).toBeDefined()
      expect(shipment.getResources()).toBeDefined()
      expect(shipment.getPayload()).toBeDefined()  
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("COR.400.100.107")
      expect(errorMessage[0].merchantMessage).toBeDefined()
    }
    
  })
})