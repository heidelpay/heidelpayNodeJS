import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import * as TestCustomerHelper from '../../helpers/CustomerTestHelper'
import HirePurchasePlan from '../../../src/payments/types/HirePurchasePlan'
import { Basket } from '../../../src'
import HirePurchase from '../../../src/payments/types/HirePurchase'
import Authorization from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'
import { Customer } from '../../../src/payments/Customer'
import Cancel from '../../../src/payments/business/Cancel'


describe('HirePurchase test', () => {
  let heidelpay: Heidelpay

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  const { 
    getAuthorizationWithInterest, getChargeAuthorization, createBasket, 
    getCancelChargeHirePurchase, getUpdateHirePurchase
  } = TestHelper
  const { createFullCustomer } = TestCustomerHelper

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

  it('should return amount equal to grossAmount when calling cancelCharge and passing gross, net and vat amounts', async () => {
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

    const customer: Customer = await heidelpay.createCustomer(createFullCustomer())
    const customerId: string = customer.getCustomerId()
    const basket: Basket = await heidelpay.createBasket(createBasket())
    const basketId: string = basket.getId()

    const hirePurchasePaymentType = await heidelpay.createPaymentType(hirePurchase) as HirePurchase
    const hirePurchasePaymentId: string = hirePurchasePaymentType.getId()
    const auth: Authorization = await heidelpay.authorize(getAuthorizationWithInterest(hirePurchasePaymentId, customerId, basketId))
    const authPaymentId = auth.getResources().getPaymentId()
    const charge: Charge = await heidelpay.chargeAuthorization(getChargeAuthorization(authPaymentId))
    const chargePaymentId: string = charge.getResources().getPaymentId()
    const chargeId: string = charge.getId()
    const amountGross: string = '100.0000'
    const amountNet: string = '90'
    const amountVat: string = '10'
    const cancelCharge: Cancel = await heidelpay.cancelCharge(getCancelChargeHirePurchase(chargePaymentId, chargeId, amountGross, amountNet, amountVat))
    const cancelAmount: string = cancelCharge.getAmount()

    expect(cancelAmount).toEqual(amountGross)
  })

  it('should allow to update hirePurchase after creating hirePurchase payment type', async () => {
    const hirePurchasePlanList: Array<HirePurchasePlan> = await heidelpay.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    const hirePurchase: HirePurchase = new HirePurchase()
    const hirePurchasePlan: HirePurchasePlan = hirePurchasePlanList[0]

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

    const hirePurchaseOriginal = await heidelpay.createPaymentType(hirePurchase) as HirePurchase
    const hirePurchasePaymentId: string = hirePurchaseOriginal.getId()
    const hirePurchaseUpdated = await heidelpay.updateHirePurchase(hirePurchasePaymentId, getUpdateHirePurchase('Michael Jordan', '2020-12-12')) 
    
    expect(hirePurchaseOriginal.getAccountHolder()).not.toBe(hirePurchaseUpdated.getAccountHolder())
    expect(hirePurchaseOriginal.getAccountHolder()).toBe('Rene Felder')
    expect(hirePurchaseUpdated.getAccountHolder()).toBe('Michael Jordan')

    expect(hirePurchaseOriginal.getInvoiceDueDate()).not.toEqual(hirePurchaseUpdated.getInvoiceDueDate())
    expect(hirePurchaseOriginal.getInvoiceDueDate()).toBe('2020-08-30')
    expect(hirePurchaseUpdated.getInvoiceDueDate()).toBe('2020-12-12')

    expect(hirePurchaseOriginal.getInvoiceDate()).not.toEqual(hirePurchaseUpdated.getInvoiceDate())
    expect(hirePurchaseOriginal.getIban()).not.toEqual(hirePurchaseUpdated.getIban())
    expect(hirePurchaseOriginal.getBic()).not.toEqual(hirePurchaseUpdated.getBic())
  })
})