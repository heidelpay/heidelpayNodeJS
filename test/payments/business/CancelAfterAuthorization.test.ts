import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Authorization, { authorizeObject } from '../../../src/payments/business/Authorization'
import Cancel, { cancelAuthorizeObject } from '../../../src/payments/business/Cancel'

describe('Cancel after authorize test', () => {
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

    fetchMock.post('end:/payments/s-pay-3195/authorize/s-aut-1/cancels', {
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

  it('Test reversal after authorize', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    const cancelAuthorize: Cancel = await authorize.cancel()

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')

    expect(cancelAuthorize.getId()).toEqual('s-cnl-1')
  })

  it('Test reversal partial after authorize', async () => {
    const authorizePayload: authorizeObject = {
      amount: 100,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    const cancelAuthorize: Cancel = await authorize.cancel(50)

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')

    expect(cancelAuthorize.getId()).toEqual('s-cnl-1')
  })
})
