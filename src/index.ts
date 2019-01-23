import './configs/Path'
import Heidelpay from './Heidelpay'
import { Customer, Address, Salutation } from './payments/Customer'
import Metadata from './payments/Metadata'
import Card from './payments/types/Card'
import EPS from './payments/types/Eps'
import Giropay from './payments/types/Giropay'
import Ideal from './payments/types/Ideal'
import Invoice from './payments/types/Invoice'
import InvoiceGuaranteed from './payments/types/InvoiceGuaranteed'
import Prepayment from './payments/types/Prepayment'
import Przelewy24 from './payments/types/Przelewy24'
import SepaDirectDebit from './payments/types/SepaDirectDebit'
import SepaDirectDebitGuaranteed from './payments/types/SepaDirectDebitGuaranteed'
import Sofort from './payments/types/Sofort'
import PIS from './payments/types/Pis'

export default Heidelpay
export {
  Customer,
  Metadata,
  Address,
  Salutation,
  Card,
  EPS,
  Giropay,
  Ideal,
  Invoice,
  InvoiceGuaranteed,
  Prepayment,
  Przelewy24,
  SepaDirectDebit,
  SepaDirectDebitGuaranteed,
  Sofort,
  PIS
}
