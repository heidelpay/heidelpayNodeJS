import PaymentType from '../PaymentType';
import Exception from '../Exception';

export default class Sepa extends PaymentType {
  constructor(iban = '') {
    super()
    if (!iban) {
      throw new Exception('IBAN is requried!')
    }
    this.iban = iban
  }

  setIBAN(iban) {
    if (!iban) {
      throw new Exception('IBAN is requried!')
    }

    this.iban = iban
  }
}
