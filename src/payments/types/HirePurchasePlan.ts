import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class HirePurchasePlan extends AbstractPaymentType implements PaymentType {
  private _numberOfRates: number
  private _dayOfPurchase: string
  private _orderDate: string
  private _totalPurchaseAmount: number
  private _totalInterestAmount: number
  private _totalAmount: number
  private _effectiveInterestRate: number
  private _nominalInterestRate: number
  private _feeFirstRate: number
  private _feePerRate: number
  private _monthlyRate: number
  private _lastRate: number

  constructor() {
    super()
  }

  /**
   * Set Number of Rate
   *
   * @param {string} numberOfRates
   * @returns {HirePurchase}
   */
  public setNumberOfRates(numberOfRates: number): HirePurchasePlan {
    this._numberOfRates = numberOfRates
    return this
  }

  /**
   * Get Number of Rate
   *
   * @returns {string}
   */
  public getNumberOfRates(): number {
    return this._numberOfRates
  }

  /**
   * Set Day of purchase
   *
   * @param {string} dayOfPurchase
   * @returns {HirePurchase}
   */
  public setDayOfPurchase(dayOfPurchase: string): HirePurchasePlan {
    this._dayOfPurchase = dayOfPurchase
    return this
  }

  /**
   * Get Day of Purchase
   *
   * @returns {string}
   */
  public getDayOfPurchase(): string {
    return this._dayOfPurchase
  }

  /**
   * Set Order Date
   *
   * @param {string} orderDate
   * @returns {HirePurchase}
   */
  public setOrderDate(orderDate: string): HirePurchasePlan {
    this._orderDate = orderDate
    return this
  }

  /**
   * Get Order Date
   *
   * @returns {string}
   */
  public getOrderDate(): string {
    return this._orderDate
  }

  /**
   * Set Total Purchase Amount
   *
   * @param {number} totalPurchaseAmount
   * @returns {HirePurchasePlan}
   */
  public setTotalPurchaseAmount(totalPurchaseAmount: number): HirePurchasePlan {
    this._totalPurchaseAmount = totalPurchaseAmount
    return this
  }

  /**
   * Get Total Purchase Amount
   *
   * @returns {number}
   */
  public getTotalPurchaseAmount(): number {
    return this._totalPurchaseAmount
  }

  /**
   * Set Interest Amount
   *
   * @param {number} totalInterestAmount
   * @returns {HirePurchasePlan}
   */
  public setTotalInterestAmount(totalInterestAmount: number): HirePurchasePlan {
    this._totalInterestAmount = totalInterestAmount
    return this
  }

  /**
   * Get Interest Amount
   *
   * @returns {number}
   */
  public getTotalInterestAmount(): number {
    return this._totalInterestAmount
  }

  /**
   * Set Total Amount
   *
   * @param {number} totalAmount
   * @returns {HirePurchase}
   */
  public setTotalAmount(totalAmount: number): HirePurchasePlan {
    this._totalAmount = totalAmount
    return this
  }

  /**
   * Get Total Amount
   *
   * @returns {number}
   */
  public getTotalAmount(): number {
    return this._totalAmount
  }

  /**
   * Set Effective Interest Rate
   *
   * @param {number} effectiveInterestRate
   * @returns {HirePurchasePlan}
   */
  public setEffectiveInterestRate(effectiveInterestRate: number): HirePurchasePlan {
    this._effectiveInterestRate = effectiveInterestRate
    return this
  }

  /**
   * Get Total Amount
   *
   * @returns {number}
   */
  public getEffectiveInterestRate(): number {
    return this._effectiveInterestRate
  }

  /**
   * Set Nominal Interest Rate
   *
   * @param {number} nominalInterestRate
   * @returns {HirePurchase}
   */
  public setNominalInterestRate(nominalInterestRate: number): HirePurchasePlan {
    this._nominalInterestRate = nominalInterestRate
    return this
  }

  /**
   * Get Nominal Interest Rate
   *
   * @returns {number}
   */
  public getNominalInterestRate(): number {
    return this._nominalInterestRate
  }

  /**
   * Set Fee First Rate
   *
   * @param {number} feeFirstRate
   * @returns {HirePurchase}
   */
  public setFeeFirstRate(feeFirstRate: number): HirePurchasePlan {
    this._feeFirstRate = feeFirstRate
    return this
  }

  /**
   * Get Nominal Interest Rate
   *
   * @returns {number}
   */
  public getFeeFirstRate(): number {
    return this._feeFirstRate
  }

  /**
   * Set Fee Per Rate
   *
   * @param {number} feePerRate
   * @returns {HirePurchase}
   */
  public setFeePerRate(feePerRate: number): HirePurchasePlan {
    this._feePerRate = feePerRate
    return this
  }

  /**
   * Get Nominal Interest Rate
   *
   * @returns {number}
   */
  public getFeePerRate(): number {
    return this._feePerRate
  }

  /**
   * Set Monthly Rate
   *
   * @param {number} monthlyRate
   * @returns {HirePurchase}
   */
  public setMonthlyRate(monthlyRate: number): HirePurchasePlan {
    this._monthlyRate = monthlyRate
    return this
  }

  /**
   * Get Monthly Rate
   *
   * @returns {number}
   */
  public getMonthlyRate(): number {
    return this._monthlyRate
  }

  /**
   * Set Last Rate
   *
   * @param {number} lastRate
   * @returns {HirePurchase}
   */
  public setLastRate(lastRate: number): HirePurchasePlan {
    this._lastRate = lastRate
    return this
  }

  /**
   * Get Monthly Rate
   *
   * @returns {number}
   */
  public getLastRate(): number {
    return this._lastRate
  }
  
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_HIRE_PURCHASE_PLANS
  }

  /**
   * Get Payload
   *
   * @returns {*}
   */
  public getPayload(): any {
    return {}
  }
}
