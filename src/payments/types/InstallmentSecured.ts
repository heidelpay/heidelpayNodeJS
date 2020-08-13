import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class InstallmentSecured extends AbstractPaymentType implements PaymentType {
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
   * @returns {InstallmentSecured}
   */
  public setIban(iban: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setBic(bic: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setAccountHolder(accountHolder: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setInvoiceDate(invoiceDate: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setInvoiceDueDate(invoiceDueDate: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setNumberOfRates(numberOfRates: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setDayOfPurchase(dayOfPurchase: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setOrderDate(orderDate: string): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setTotalPurchaseAmount(totalPurchaseAmount: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setTotalInterestAmount(totalInterestAmount: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setTotalAmount(totalAmount: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setEffectiveInterestRate(effectiveInterestRate: number): InstallmentSecured {
    this._effectiveInterestRate = effectiveInterestRate
    return this
  }

  /**
   * Get Effective Interest Rate
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
   * @returns {InstallmentSecured}
   */
  public setNominalInterestRate(nominalInterestRate: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setFeeFirstRate(feeFirstRate: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setFeePerRate(feePerRate: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setMonthlyRate(monthlyRate: number): InstallmentSecured {
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
   * @returns {InstallmentSecured}
   */
  public setLastRate(lastRate: number): InstallmentSecured {
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
    return apiURL.URL_TYPE_INSTALLMENT_SECURED
  }

  /**
   * Get Payload
   *
   * @returns {*}
   */
  public getPayload(): any {
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

export type updateInstallmentSecuredObject = {
  iban?: string,
  bic?: string,
  accountHolder?: string,
  invoiceDate?: string,
  invoiceDueDate?: string,
}