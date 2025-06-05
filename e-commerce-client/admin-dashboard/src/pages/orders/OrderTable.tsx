
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import {OrderTableColumnsProps} from '../../constants/OrderTableColumns'
import { useNavigate } from "react-router-dom";
import useOrderList from "../../hooks/useOrderList";
import NoDataAvailable from "../../components/NodataAvailable";

interface OrderTableProps {
    columns: OrderTableColumnsProps[];
}

const OrderTable = ({columns}: OrderTableProps) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [date, setDate] = useState<Dayjs | null>(dayjs());
    const { data: orders = { orders: [], totalOrders: 0 } } = useOrderList(page + 1, rowsPerPage); 

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
            {/* <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <CustomDatePicker value={date} onChange={setDate} label="Select Your Date" />
                <TextField
                    label="Search"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
            </div> */}

            <TableContainer>
                <Table sx={{ minWidth: 800 }} size="small">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column: OrderTableColumnsProps) => (
                                <TableCell key={column.id} sx={{fontWeight:500,color:"gray",fontSize:17}}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.orders?.length > 0 ? (
                            orders.orders.map((order: any) => (
                                <TableRow key={order.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/order/${order.id}`)}>
                                    <TableCell>{order.id || "---"}</TableCell>
                                    <TableCell>
                                        {order?.date ? dayjs(order.date).format("DD/MM/YYYY HH:mm A") : "---"}
                                    </TableCell>
                                    <TableCell>{order?.username || "---"}</TableCell>
                                    <TableCell>{order?.email || "---"}</TableCell>
                                    <TableCell>{order?.status || "---"}</TableCell>
                                    <TableCell>${order?.totalAmount || "---"}</TableCell>
                                    <TableCell>{order?.paymentMethod || "---"}</TableCell>
                                    <TableCell>{order.coupon || "---"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <NoDataAvailable />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={orders.totalOrders || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default OrderTable;