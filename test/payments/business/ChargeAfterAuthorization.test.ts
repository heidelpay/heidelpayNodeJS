import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Authorization, { authorizeObject } from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'

describe('Charge after authorize test', () => {
  let heidelpay

  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/cards', {
      id: 's-crd-llany1bnku9e'
    })

    fetchMock.post('end:/customers', {
      id: 's-cst-27001cb455ba'
    })

    fetchMock.post('end:/payments/authorize', {
      id: 's-aut-1',
      resources: {
        customerId: '',
        paymentId: 's-pay-3195',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-egvhe5zs1imk'
      }
    })

    fetchMock.post('end:/payments/s-pay-3195/charges', {
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
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test charge after authorize', async () => {
    const authorizePayload: authorizeObject = {
      amount: 100,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    const chargeAuthorize: Charge = await authorize.charge()

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')

    expect(chargeAuthorize.getId()).toEqual('s-chg-1')
    expect(chargeAuthorize.getResources().getPaymentId()).toEqual('s-pay-3195')
    expect(chargeAuthorize.getResources().getTypeId()).toEqual('s-crd-egvhe5zs1imk')
  })

  it('Test charge partial after authorize', async () => {
    const authorizePayload: authorizeObject = {
      amount: 100,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    const chargeAuthorize: Charge = await authorize.charge(50)

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')

    expect(chargeAuthorize.getId()).toEqual('s-chg-1')
    expect(chargeAuthorize.getResources().getPaymentId()).toEqual('s-pay-3195')
    expect(chargeAuthorize.getResources().getTypeId()).toEqual('s-crd-egvhe5zs1imk')
  })
})
