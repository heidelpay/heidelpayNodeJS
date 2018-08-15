import { Authorize } from "../main";

class Payment {
	constructor(type, customer) {
  }

  authorize = () => {
    return new Authorize()
  }
  charge = () => {
    return new Charge()
  }
}

export default Payment