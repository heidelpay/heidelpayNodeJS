import fetchMock from 'fetch-mock'
import Card from '../../../src/payments/types/Card'
import Heidelpay from '../../../src/Heidelpay'
import Authorization, { authorizeObject } from '../../../src/payments/business/Authorization'
import Charge, { chargeObject } from '../../../src/payments/business/Charge'

describe('Payment Type Card Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/cards', {
      id: 's-crd-llany1bnku9e'
    })

    fetchMock.get('end:/types/cards/s-crd-llany1bnku9e', {
      id: 's-crd-llany1bnku9e',
      number: '4444333322221111',
      method: 'card',
      cvv: '123',
      expiry: '03/20'
    })

    fetchMock.get('end:/payments/s-pay-3645', {
      id: 's-pay-3645',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      },
      transactions: [
        {
          date: '2018-09-10 03:53:51',
          type: 'authorize',
          url: 'https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1',
          amount: '100.0000'
        }
      ]
    })

    fetchMock.post('end:/payments/authorize', {
      id: 's-aut-1',
      resources: {
        customerId: 's-cst-27001cb455ba',
        paymentId: 's-pay-3195',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-llany1bnku9e'
      }
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
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create card with merchant NOT PCI DSS Compliant', async () => {
    let card: Card = new Card('4444333322221111', '03/20')
    card.setCVC('123')

    card = await heidelpay.createPaymentType(card)

    expect(card.getId()).toEqual('s-crd-llany1bnku9e')
  })

  it('Test Create card type', async () => {
    const card: Card = new Card('4444333322221111', '03/20')
    card.setCVC('123')

    const paymentCard: Card = await heidelpay.createPaymentType(card)

    expect(paymentCard).toBeInstanceOf(Card)
    expect(paymentCard.getId()).toEqual('s-crd-llany1bnku9e')
  })

  it('Test Authorize card type', async () => {
    let card: Card = new Card('4444333322221111', '03/20')
    card.setCVC('123')

    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    card = await heidelpay.createPaymentType(card)
    const authorize: Authorization = await card.authorize(authorizePayload)

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test Authorize card with customer Id', async () => {
    let card: Card = new Card('4444333322221111', '03/20')
    card.setCVC('123')

    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    card = await heidelpay.createPaymentType(card)
    const authorize: Authorization = await card.authorize(authorizePayload)

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  // @TODO Authorize and Get Payment

  it('Test Charge card type', async () => {
    let card: Card = new Card('4444333322221111', '03/20')
    card.setCVC('123')

    const chargePayload: chargeObject = {
      amount: 5,
      currency: 'EUR',
      returnUrl: 'https://www.google.at',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-q3ffv1eyo252'
    }

    card = await heidelpay.createPaymentType(card)
    const charge: Charge = await card.charge(chargePayload)

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toEqual('s-chg-1')
  })

  it('Test Fetch card type', async () => {
    let card: Card = new Card('4444333322221111', '03/20')
    card.setCVC('123')

    card = await heidelpay.createPaymentType(card)
    const fetchedCard: Card = await heidelpay.fetchPaymentType(card.getId())

    expect(fetchedCard.getId()).toEqual('s-crd-llany1bnku9e')
    expect(card.getPanNumber()).toEqual(fetchedCard.getPanNumber())
    expect(card.getCVC()).toEqual(fetchedCard.getCVC())
    expect(card.getExpiryDate()).toEqual(fetchedCard.getExpiryDate())
  })
})
