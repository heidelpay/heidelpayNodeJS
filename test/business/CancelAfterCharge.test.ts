import fetchMock from 'fetch-mock'
import Heidelpay from '../../src/Heidelpay'
import Charge, { chargeObject } from '../../src/payments/business/Charge'
import Cancel, { cancelChargeObject } from '../../src/payments/business/Cancel'

describe('Cancel after charge test', () => {
  let heidelpay

  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/cards', {
      id: 's-crd-llany1bnku9e'
    })

    fetchMock.post('end:/payments/charges', {
      id: 's-chg-1',
      resources: {
        customerId: '',
        paymentId: 's-pay-3195',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-egvhe5zs1imk'
      }
    })

    fetchMock.post('end:/payments/s-pay-3195/charges/s-chg-1/cancels', {
      id: 's-cnl-1',
      resources: {
        customerId: '',
        paymentId: 's-pay-3195',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-egvhe5zs1imk'
      }
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test refund after charge', async () => {
    const chargePayload: chargeObject = {
      amount: 5,
      currency: 'EUR',
      returnUrl: 'https://www.google.at',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-llany1bnku9e'
    }

    const charge: Charge = await heidelpay.charge(chargePayload)
    const cancelCharge: Cancel = await charge.cancel()

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toEqual('s-chg-1')
    expect(cancelCharge.getId()).toEqual('s-cnl-1')
  })

  it('Test reversal partial after charge', async () => {
    const chargePayload: chargeObject = {
      amount: 100,
      currency: 'EUR',
      returnUrl: 'https://www.google.at',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-llany1bnku9e'
    }

    const charge: Charge = await heidelpay.charge(chargePayload)
    const cancelcharge: Cancel = await charge.cancel(50)

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toEqual('s-chg-1')

    expect(cancelcharge.getId()).toEqual('s-cnl-1')
  })
})
