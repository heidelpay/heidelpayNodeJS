/*
 * @Author: Minh Tri Nguyen 
 * @Date: 2018-08-23 15:03:41 
 * @Last Modified by: Minh Tri Nguyen
 * @Last Modified time: 2018-08-23 16:13:09
 */

/**
 * @class CustomerBuilder
 */
class CustomerBuilder {
  /**
   * First name property
   *
   * @private
   * @type {string}
   */
  private _firstName: string

  /**
   * Last name property
   *
   * @private
   * @type {string}
   */
  private _lastName: string

  /**
   * Creates an instance of CustomerBuilder.
   * @memberof CustomerBuilder
   */
  constructor() {
    this._firstName = ''
    this._lastName = ''
  }

  /**
   * Get first name property
   *
   * @readonly
   * @type {string}
   */
  get firstName(): string {
    return this._firstName
  }

  /**
   * Set first name property
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  setFirstName(value: string): CustomerBuilder {
    this._firstName = value
    return this
  }

  /**
   * Get last name property
   *
   * @readonly
   * @type {string}
   */
  get lastName(): string {
    return this._lastName
  }

  /**
   * Set last name property
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  setLastName(value: string): CustomerBuilder {
    this._lastName = value
    return this
  }

  /**
   * Create customer from builder
   *
   * @returns {Customer}
   */
  create(): Customer {
    return new Customer(this)
  }
}

/**
 * Class Customer
 *
 * @class Customer
 */
class Customer {
  private _firstName: string
  private _lastName: string

  /**
   * Creates an instance of Customer.
   * @param {CustomerBuilder} builder
   */
  constructor(builder: CustomerBuilder) {
    this._firstName = builder.firstName
    this._lastName = builder.lastName
  }

  /**
   * Get first name property
   *
   * @readonly
   * @type {string}
   */
  get firstName(): string {
    return this._firstName
  }

  /**
   * Get last name property
   *
   * @readonly
   * @type {string}
   */
  get lastName(): string {
    return this._lastName
  }
}

export { CustomerBuilder, Customer }
