import PaymentType from './PaymentType';
import Exception from '../Exception';

export default class Card extends PaymentType {
  constructor(number = '', expiryDate = '', cvc = '') {
    super()
    this.number = number
    this.expiryDate = expiryDate
    this.cvc = cvc
  }


  setNumber(number) {
    if (!number) {
      throw new Exception('Number is requried')
    }

    this.number =  number
  }


}
