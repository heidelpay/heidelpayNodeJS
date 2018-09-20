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

  constructor(firstName: string = '', lastName: string = '') {
    this._firstName = firstName
    this._lastName = lastName
  }

  public getRequestPayload() {
    return {
      lastname: this.getLastName(),
      firstname: this.getFirstName(),
      salutation: this.getSalutation(),
      birthDate: this.getBirthDate(),
      email: this.getEmail(),
      phone: this.getPhone(),
      mobile: this.getMobile(),
      address: this.getAddress()
    }
  }

  /**
   * Set FirstName
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setFirstName(value: string): Customer {
    this._firstName = value
    return this
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
   * Set LastName
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setLastName(value: string): Customer {
    this._lastName = value
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
   * Set Salutation
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setSalutation(value: Salutation): Customer {
    this._salutation = value
    return this
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
   * Set CustomerId
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setCustomerId(value: string): Customer {
    this._customerId = value
    return this
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
   * Set Birthday
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setBirthDate(value: string): Customer {
    this._birthdDate = value
    return this
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
   * Set Emaile
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setEmail(value: string): Customer {
    this._email = value
    return this
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
   * Set Phone
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setPhone(value: string): Customer {
    this._phone = value
    return this
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
   * Set Mobile
   *
   * @param {string} value
   * @returns {Customer}
   */
  public setMobile(value: string): Customer {
    this._mobile = value
    return this
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
   * Set Address
   *
   * @param {Address} value
   * @returns {Customer}
   */
  public setAddress(value: Address): Customer {
    this._address = value
    return this
  }

  /**
   * Get address
   *
   * @type {Address}
   */
  public getAddress(): Address {
    return this._address
  }
}

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

export { Customer }
