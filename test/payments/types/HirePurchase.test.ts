import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import * as TestCustomerHelper from '../../helpers/CustomerTestHelper'
import HirePurchasePlan from '../../../src/payments/types/HirePurchasePlan'
import { HirePurchase } from '../../../src';

describe('HirePurchase test', () => {
  let heidelpay: Heidelpay

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Hire Purchase Plan', async () => {
    const hirePurchasePlanList: Array<HirePurchasePlan> = await heidelpay.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')

    expect(hirePurchasePlanList).toBeDefined()
    expect(hirePurchasePlanList.length).toEqual(6)
  })

  it('Test Create Hire Purchase Payment Type', async () => {
    const hirePurchasePlanList: Array<HirePurchasePlan> = await heidelpay.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    let hirePurchase: HirePurchase = new HirePurchase()
    let hirePurchasePlan: HirePurchasePlan = hirePurchasePlanList[0]

    hirePurchase.setNumberOfRates(hirePurchasePlan.getNumberOfRates())
    .setDayOfPurchase(hirePurchasePlan.getDayOfPurchase())
    .setOrderDate(hirePurchasePlan.getOrderDate())
    .setTotalPurchaseAmount(hirePurchasePlan.getTotalPurchaseAmount())
    .setTotalInterestAmount(hirePurchasePlan.getTotalInterestAmount())
    .setTotalAmount(hirePurchasePlan.getTotalAmount())
    .setEffectiveInterestRate(hirePurchasePlan.getEffectiveInterestRate())
    .setNominalInterestRate(hirePurchasePlan.getNominalInterestRate())
    .setFeeFirstRate(hirePurchasePlan.getFeeFirstRate())
    .setFeePerRate(hirePurchasePlan.getFeePerRate())
    .setMonthlyRate(hirePurchasePlan.getMonthlyRate())
    .setLastRate(hirePurchasePlan.getLastRate())

    hirePurchase.setIban("DE46940594210000012345")
    .setBic("COBADEFFXXX")
    .setAccountHolder("Rene Felder")
    .setInvoiceDate('2019-08-10')
    .setInvoiceDueDate('2020-08-30')
    
    hirePurchase = await heidelpay.createPaymentType(hirePurchase) as HirePurchase
    expect(hirePurchase.getId()).toBeDefined()
  })
})
