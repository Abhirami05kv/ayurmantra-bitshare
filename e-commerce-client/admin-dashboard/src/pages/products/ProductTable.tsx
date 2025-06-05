
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TablePagination
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { ProductsTableColumns } from "../../constants/ProductTableColumns";
import useProductList from "../../hooks/useProductList";
import NoDataAvailable from "../../components/NodataAvailable";
import { Loader } from "../../components/Loader";
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;

interface ProductTableProps {
  changeMode: (key: keyof DrawerModeProps, status: boolean) => void;
  setSelectedProduct: (product: any) => void;
}

function ProductTable({ changeMode, setSelectedProduct }: ProductTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: response, isLoading, isError } = useProductList();
  const products = response?.data || [];
  const totalProducts = response?.total || 0;
 

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    changeMode("isEdit", true);
  };

 
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {ProductsTableColumns.map((column) => (
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
            {/* Show Loader */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={ProductsTableColumns.length} align="center">
                  <Loader/>
                </TableCell>
              </TableRow>
            )}

            {/* Show Error Message */}
            {isError && (
              <TableRow>
                <TableCell colSpan={ProductsTableColumns.length} align="center">
                 <NoDataAvailable/>
                </TableCell>
              </TableRow>
            )}

            {/* Render Product Rows */}
            {!isLoading && !isError && products.length > 0
              ? products.map((product: any) => (
                  <TableRow key={product?.id} hover>
                    <TableCell>{product?.id}</TableCell>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{product?.categoryId || "--"}</TableCell>
                    <TableCell>{(product?.stock >0 ? product?.stock :  "Out of stock")|| "---"}</TableCell>

                    <TableCell>
                      <Box display="flex" gap={1}>
                        {product?.imageUrls ? (
                          <img
                            loading="lazy"
                            src={`${IMAGE_BASE_URL}${product?.imageUrls}`}
                            alt={product.name || "Product Image"}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "--"
                        )}
                      </Box>
                    </TableCell>

                    <TableCell>${product?.price || "--"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleEditProduct(product)}
                      >
                        <EditOutlinedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : !isLoading &&
                !isError && (
                  <TableRow>
                    <TableCell
                      colSpan={ProductsTableColumns.length}
                      align="center"
                    >
                     <NoDataAvailable/>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalProducts} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_,newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}

export default ProductTable;
