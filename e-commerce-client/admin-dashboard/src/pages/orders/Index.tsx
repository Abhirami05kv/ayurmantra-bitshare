
import { OrderTableColumns } from '../../constants/OrderTableColumns'
import OrderTable from './OrderTable'

function OrderManagement() {
  return (
    <div><OrderTable  columns={OrderTableColumns}/></div>
  )
}

export default OrderManagement