import Authorize from './Authorize';
import Charge from './Charge';

class Payment {
	constructor() {
  }

  authorize = () => {
    return new Authorize()
  }
  charge = () => {
    return new Charge()
  }
}

export default Payment
