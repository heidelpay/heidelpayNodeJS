import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'
import SepaDirectDebitGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'

describe('Payment Type SepaDirectDebitGuaranteed Test', () => {
  let heidelpay: Heidelpay
  const { createFullCustomer } = CustomerTestHelper
  const { getCharge } = TestHelper

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

  it('Test geoLocation', async () => {
    const ssd: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed
    const fetchSepaDirectDebitGuaranteed: SepaDirectDebitGuaranteed = await heidelpay.fetchPaymentType(ssd.getId()) as SepaDirectDebitGuaranteed

    expect(ssd.getGeoLocation()).toBeDefined()
    expect(fetchSepaDirectDebitGuaranteed.getGeoLocation()).toBeDefined()
  })
})
