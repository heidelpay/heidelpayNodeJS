/**
 * Customer
 * @class
 * @property {string} firstName
 * @property {string} lastName
 **/
export default class Customer {
  constructor({firstName = '', lastName = ''}) {
    this.firstName = firstName
    this.lastName = lastName
  }

  setFirstName(firstName) {
    this.firstName = firstName
    return this
  }
  setLastName(lastName) {
    this.lastName = lastName
    return this
  }

  toJSON() {

  }
}
