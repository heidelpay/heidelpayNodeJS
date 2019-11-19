import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class HirePurchase extends AbstractPaymentType implements PaymentType {
  private _iban: string
  private _bic: string
  private _accountHolder: string
  private _invoiceDate: string
  private _invoiceDueDate: string

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
   * Set Iban
   *
   * @param {string} iban
   * @returns {HirePurchase}
   */
  public setIban(iban: string): HirePurchase {
    this._iban = iban
    return this
  }

  /**
   * Get Iban
   *
   * @returns {string}
   */
  public getIban(): string {
    return this._iban
  }

  /**
   * Set BIC
   *
   * @param {string} bic
   * @returns {HirePurchase}
   */
  public setBic(bic: string): HirePurchase {
    this._bic = bic
    return this
  }

  /**
   * Get Bic
   *
   * @returns {string}
   */
  public getBic(): string {
    return this._bic
  }

  /**
   * Set Account Holader
   *
   * @param {string} accountHolder
   * @returns {HirePurchase}
   */
  public setAccountHolder(accountHolder: string): HirePurchase {
    this._accountHolder = accountHolder
    return this
  }

  /**
   * Get Account Holder
   *
   * @returns {string}
   */
  public getAccountHolder(): string {
    return this._accountHolder
  }

  /**
   * Set Invoice Date
   *
   * @param {string} invoiceDate
   * @returns {HirePurchase}
   */
  public setInvoiceDate(invoiceDate: string): HirePurchase {
    this._invoiceDate = invoiceDate
    return this
  }

  /**
   * Get Invoice Date
   *
   * @returns {string}
   */
  public getInvoiceDate(): string {
    return this._invoiceDate
  }

  /**
   * Set Invoice Due Date
   *
   * @param {string} invoiceDueDate
   * @returns {HirePurchase}
   */
  public setInvoiceDueDate(invoiceDueDate: string): HirePurchase {
    this._invoiceDueDate = invoiceDueDate
    return this
  }

  /**
   * Get Invoice Due Date
   *
   * @returns {string}
   */
  public getInvoiceDueDate(): string {
    return this._invoiceDueDate
  }

  /**
   * Set Number of Rate
   *
   * @param {string} numberOfRates
   * @returns {HirePurchase}
   */
  public setNumberOfRates(numberOfRates: number): HirePurchase {
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
  public setDayOfPurchase(dayOfPurchase: string): HirePurchase {
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
  public setOrderDate(orderDate: string): HirePurchase {
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
   * Set Total Amount
   *
   * @param {number} totalPurchaseAmount
   * @returns {HirePurchase}
   */
  public setTotalPurchaseAmount(totalPurchaseAmount: number): HirePurchase {
    this._totalPurchaseAmount = totalPurchaseAmount
    return this
  }

  /**
   * Get Total Amount
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
   * @returns {HirePurchase}
   */
  public setTotalInterestAmount(totalInterestAmount: number): HirePurchase {
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
  public setTotalAmount(totalAmount: number): HirePurchase {
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
   * Set Total Amount
   *
   * @param {number} totalAmount
   * @returns {HirePurchase}
   */
  public setEffectiveInterestRate(effectiveInterestRate: number): HirePurchase {
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
  public setNominalInterestRate(nominalInterestRate: number): HirePurchase {
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
  public setFeeFirstRate(feeFirstRate: number): HirePurchase {
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
  public setFeePerRate(feePerRate: number): HirePurchase {
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
  public setMonthlyRate(monthlyRate: number): HirePurchase {
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
  public setLastRate(lastRate: number): HirePurchase {
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
    return apiURL.URL_TYPE_HIRE_PURCHASE
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    return {
      iban: this.getIban(),
      bic: this.getBic(),
      accountHolder: this.getAccountHolder(),
      invoiceDate: this.getInvoiceDate(),
      invoiceDueDate: this.getInvoiceDueDate(),
      numberOfRates: this.getNumberOfRates(),
      dayOfPurchase: this.getDayOfPurchase(),
      totalPurchaseAmount: this.getTotalPurchaseAmount(),
      totalInterestAmount: this.getTotalInterestAmount(),
      totalAmount: this.getTotalAmount(),
      effectiveInterestRate: this.getEffectiveInterestRate(),
      nominalInterestRate: this.getNominalInterestRate(),
      feeFirstRate: this.getFeeFirstRate(),
      feePerRate: this.getFeePerRate(),
      monthlyRate: this.getMonthlyRate(),
      lastRate: this.getLastRate(),
    }
  }
}

export type updateHirePurchaseObject = {
  iban?: string,
  bic?: string,
  accountHolder?: string,
  invoiceDate?: string,
  invoiceDueDate?: string,
}