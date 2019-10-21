import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Paypage from '../../../src/payments/paypage/Paypage'

describe('Paypage test', () => {
  let heidelpay: Heidelpay

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test init paypage authorize', async () => {
    const paypage: Paypage = await heidelpay.initAuthorizePaypage(TestHelper.createMinimumPaypage())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('AUTHORIZE')
  })

  it('Test init paypage charge', async () => {
    const paypage: Paypage = await heidelpay.initChargePaypage(TestHelper.createMinimumPaypage())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
  })

  it('Test init paypage authorize with full paypage', async () => {
    const paypage: Paypage = await heidelpay.initAuthorizePaypage(TestHelper.createFullPaypage())
    
    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('AUTHORIZE')
  })

  it('Test init paypage charge with full paypage', async () => {
    const paypage: Paypage = await heidelpay.initChargePaypage(TestHelper.createFullPaypage())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
  })

  it('Test init paypage charge with resources', async () => {
    const paypage: Paypage = await heidelpay.initChargePaypage(TestHelper.createMinimumPaypageWithResources())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
  })
})
