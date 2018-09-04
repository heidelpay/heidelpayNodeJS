/**
 * Enum Salutation
 *
 * @export
 * @enum {number}
 */
export enum Salutation {
  mr = 'mr',
  ms = 'ms',
  unknown = 'unknow'
}

export type Address = {
  name: string
  street: string
  state: string
  zip: string
  city: string
  country: string
}

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
   * Salutation property
   *
   * @private
   * @type {string}
   */
  private _salutation: Salutation

  /**
   * Customer Id property
   *
   * @private
   * @type {string}
   */
  private _customerId: string

  /**
   * Birthday property
   *
   * @private
   * @type {Date}
   */
  private _birthDate: string

  /**
   * Email property
   *
   * @private
   * @type {string}
   */
  private _email: string

  /**
   * Phone property
   *
   * @private
   * @type {string}
   */
  private _phone: string

  /**
   * Mobile property
   *
   * @private
   * @type {string}
   */
  private _mobile: string

  /**
   * Address property
   *
   * @private
   * @type {Address}
   */
  private _address: Address

  /**
   * Creates an instance of CustomerBuilder.
   */
  constructor() {
    this._firstName = ''
    this._lastName = ''
    this._salutation = Salutation.mr
    this._customerId = ''
    this._birthDate = ''
    this._email = ''
    this._phone = ''
    this._mobile = ''
    this._address = {
      name: '',
      street: '',
      state: '',
      zip: '',
      city: '',
      country: ''
    }
  }

  /**
   * Get first name property
   *
   * @type {string}
   */
  public getFirstName(): string {
    return this._firstName
  }

  /**
   * Set first name property
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setFirstName(value: string): CustomerBuilder {
    this._firstName = value
    return this
  }

  /**
   * Get last name property
   *
   * @type {string}
   */
  public getLastName(): string {
    return this._lastName
  }

  /**
   * Set last name property
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setLastName(value: string): CustomerBuilder {
    this._lastName = value
    return this
  }

  /**
   * Get Salutation
   *
   * @type {Salutation}
   */
  public getSalutation(): Salutation {
    return this._salutation
  }

  /**
   * Set Salutation
   *
   * @param {Salutation} value
   * @returns {CustomerBuilder}
   */
  public setSalutation(value: Salutation): CustomerBuilder {
    this._salutation = value
    return this
  }

  /**
   * Get cusomter Id
   *
   * @type {string}
   */
  public getCustomerId(): string {
    return this._customerId
  }

  /**
   * Set cusomter Id
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setCustomerId(value: string): CustomerBuilder {
    this._customerId = value
    return this
  }

  /**
   * Get Birthday
   *
   * @type {string}
   */
  public getBirthDate(): string {
    return this._birthDate
  }

  /**
   * Set Birthday
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setBirthDate(value: string): CustomerBuilder {
    this._birthDate = value
    return this
  }

  /**
   * Get Email
   *
   * @type {string}
   */
  public getEmail(): string {
    return this._email
  }

  /**
   * Set Email
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setEmail(value: string): CustomerBuilder {
    this._email = value
    return this
  }

  /**
   * Get Phone
   *
   * @type {string}
   */
  public getPhone(): string {
    return this._phone
  }

  /**
   * Set Phone
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setPhone(value: string): CustomerBuilder {
    this._phone = value
    return this
  }

  /**
   * Get Mobile
   *
   * @type {string}
   */
  public getMobile(): string {
    return this._mobile
  }

  /**
   * Set Mobile
   *
   * @param {string} value
   * @returns {CustomerBuilder}
   */
  public setMobile(value: string): CustomerBuilder {
    this._mobile = value
    return this
  }

  /**
   * Get Address
   *
   * @type {Address}
   */
  public getAddress(): Address {
    return this._address
  }

  /**
   * Set Address
   *
   * @param {Address} value
   * @returns {CustomerBuilder}
   */
  public setAddress(value: Address): CustomerBuilder {
    this._address = value
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
  private _salutation: Salutation
  private _customerId: string
  private _birthdDate: string
  private _email: string
  private _phone: string
  private _mobile: string
  private _address: Address
  private _id: string

  /**
   * Creates an instance of Customer.
   * @param {CustomerBuilder} builder
   */
  constructor(builder: CustomerBuilder) {
    this._firstName = builder.getFirstName() || ''
    this._lastName = builder.getLastName()
    this._salutation = builder.getSalutation()
    this._customerId = builder.getCustomerId()
    this._birthdDate = builder.getBirthDate()
    this._email = builder.getEmail()
    this._phone = builder.getPhone()
    this._mobile = builder.getMobile()
    this._address = builder.getAddress()
    this._id = ''
  }

  /**
   * Get first name property
   *
   * @type {string}
   */
  public getFirstName(): string {
    return this._firstName
  }

  /**
   * Get last name property
   *
   * @type {string}
   */
  public getLastName(): string {
    return this._lastName
  }

  /**
   * Get salutation
   *
   * @type {Salutation}
   */
  public getSalutation(): Salutation {
    return this._salutation
  }

  /**
   * Get customer Id
   *
   * @type {string}
   */
  public getCustomerId(): string {
    return this._customerId
  }

  /**
   * Get birthdate
   *
   * @type {Date}
   */
  public getBirthDate(): string {
    return this._birthdDate
  }

  /**
   * Get email
   *
   * @type {string}
   */
  public getEmail(): string {
    return this._email
  }

  /**
   * Get phone
   *
   * @type {string}
   */
  public getPhone(): string {
    return this._phone
  }

  /**
   * Get mobile
   *
   * @type {string}
   */
  public getMobile(): string {
    return this._mobile
  }

  /**
   * Get address
   *
   * @type {Address}
   */
  public getAddress(): Address {
    return this._address
  }

  /**
   * Set Id
   *
   * @param {string} id
   */
  public setId(id: string): void {
    this._id = id
  }

  /**
   * Get Id
   *
   * @returns {string}
   */
  public getId(): string {
    return this._id
  }
}

export { CustomerBuilder, Customer }
