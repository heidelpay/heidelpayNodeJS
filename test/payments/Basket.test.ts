import Basket from '../../src/payments/Basket'
import Heidelpay from '../../src/Heidelpay'
import * as TestHelper from '../helpers/TestHelper'

describe('Basket test', () => {
  let heidelpay: Heidelpay
  const { createBasket, createBasketWithOneItemsForUpdate, createBasketWithTwoItemsForUpdate } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test create a baskset', async () => {
    const basket: Basket = await heidelpay.createBasket(createBasket())

    expect(basket).toBeInstanceOf(Basket)
    expect(basket.getId()).toBeDefined()
  })

  it('Test create and fetch baskset', async () => {
    const basket: Basket = await heidelpay.createBasket(createBasket())
    const fetchedBasket: Basket = await heidelpay.fetchBasket(basket.getId())
    
    expect(basket).toBeInstanceOf(Basket)
    expect(fetchedBasket).toBeInstanceOf(Basket)
    expect(basket.getId()).toEqual(fetchedBasket.getId())
  })

  it('Test create and update baskset', async () => {
    const basket: Basket = await heidelpay.createBasket(createBasket())
    const fetchedNewBasket = await heidelpay.fetchBasket(basket.getId())

    const updateBasket = createBasketWithOneItemsForUpdate(fetchedNewBasket.getOrderId())

    const updatedBasket = await heidelpay.updateBasket(fetchedNewBasket.getId(), updateBasket)
    const fetchedUpdateBasket = await heidelpay.fetchBasket(updatedBasket.getId())
    
    expect(fetchedUpdateBasket.getOrderId()).toEqual(updateBasket.getOrderId())
    expect(fetchedUpdateBasket.getNote()).toEqual(updateBasket.getNote())
  })

  it('Test create and update baskset item', async () => {
    const basket: Basket = await heidelpay.createBasket(createBasket())
    const fetchedNewBasket = await heidelpay.fetchBasket(basket.getId())

    const updateBasket = createBasketWithTwoItemsForUpdate(fetchedNewBasket.getOrderId())

    const updatedBasket = await heidelpay.updateBasket(fetchedNewBasket.getId(), updateBasket)
    const fetchedUpdateBasket = await heidelpay.fetchBasket(updatedBasket.getId())
    
    expect(fetchedNewBasket.getItems()).toHaveLength(1)
    expect(fetchedUpdateBasket.getItems()).toHaveLength(2)
  })
})
