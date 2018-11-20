import './configs/Path'
import Heidelpay from './Heidelpay'
import { Customer, Address, Salutation } from './payments/Customer'
import Card from './payments/types/Card'
import Giropay from './payments/types/Giropay'
import Ideal from './payments/types/Ideal'
import Invoice from './payments/types/Invoice'
import InvoiceGuaranteed from './payments/types/InvoiceGuaranteed'
import Prepayment from './payments/types/Prepayment'
import Przelewy24 from './payments/types/Przelewy24'
import SepaDirectDebit from './payments/types/SepaDirectDebit'
import SepaDirectDebitGuaranteed from './payments/types/SepaDirectDebitGuaranteed'
import Sofort from './payments/types/Sofort'
import Pis from './payments/types/Pis'

export default Heidelpay
export {
  Customer,
  Address,
  Salutation,
  Card,
  Giropay,
  Ideal,
  Invoice,
  InvoiceGuaranteed,
  Prepayment,
  Przelewy24,
  SepaDirectDebit,
  SepaDirectDebitGuaranteed,
  Sofort,
  Pis
}
