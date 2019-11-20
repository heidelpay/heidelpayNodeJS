import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Bancontact from '../../../src/payments/types/Bancontact'
import Charge from '../../../src/payments/business/Charge'

describe('Payment Type Bancontact Test', () => {
  let heidelpay: Heidelpay
  const { getCharge } = TestHelper

  const getBancontact = () => {
    return new Bancontact()
  }

  const getBancontactWithHolder = () => {
    return new Bancontact().setHolder('Nikola Tesla')
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Bancontact payment type', async () => {
    const bancontact: Bancontact = await heidelpay.createPaymentType(getBancontact()) as Bancontact

    expect(bancontact.getId()).toBeDefined()
  })

  it('Test Charge Bancontact', async () => {
    const bancontact: Bancontact = await heidelpay.createPaymentType(getBancontact()) as Bancontact
    const charge: Charge = await heidelpay.charge(getCharge(bancontact.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch Bancontact payment type', async () => {
    const bancontact: Bancontact = await heidelpay.createPaymentType(getBancontact()) as Bancontact
    const fetchBancontact: Bancontact = await heidelpay.fetchPaymentType(bancontact.getId()) as Bancontact

    expect(fetchBancontact.getId()).toEqual(bancontact.getId())
  })

  it('should set the holder if holder is passed', async () => {
    const bancontact: Bancontact = await heidelpay.createPaymentType(getBancontactWithHolder()) as Bancontact
    expect(bancontact.getPayload()).toHaveProperty('holder', 'Nikola Tesla')
    expect(bancontact.getHolder()).toBe('Nikola Tesla')
  })
})
