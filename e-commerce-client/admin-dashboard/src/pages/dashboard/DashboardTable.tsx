import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DashboardTableColumns } from "../../constants/DashboarTableColumns";
import useOrderList from "../../hooks/useOrderList";
import dayjs from "dayjs";
import NoDataAvailable from "../../components/NodataAvailable";


function DashboardTable() {
  const { data: orders = [] } = useOrderList(1,10);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {DashboardTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ fontWeight: 500, color: "gray", fontSize: 17 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.totalOrders > 0 ? (
              orders?.orders?.map((order: any) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order?.id || "---"}</TableCell>
                  <TableCell>
                    {order?.date ? dayjs(order.date).format("DD/MM/YYYY HH:mm A") : "---"}
                  </TableCell>
                  <TableCell>{order?.username || "---"}</TableCell>
                  <TableCell>{order?.email || "---"}</TableCell>
                  <TableCell>{order?.totalAmount || "---"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={DashboardTableColumns.length} align="center">
                  <NoDataAvailable />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DashboardTable;