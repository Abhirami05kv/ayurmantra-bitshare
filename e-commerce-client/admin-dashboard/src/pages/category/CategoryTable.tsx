import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { CategoryTableColumns } from "../../constants/CategoryTableColumns";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useCategoryList from "../../hooks/useCategoryList";
import { Loader } from "../../components/Loader";
import { useState } from "react";
import NoDataAvailable from "../../components/NodataAvailable";

interface CategoryTableProps {
  changeMode: (key: keyof DrawerModeProps, status: boolean) => void;
  setSelectedCategory: (category: CategoryDataProps) => void;
}

function CategoryTable({ changeMode, setSelectedCategory }: CategoryTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch categories with pagination
  const { data: categories, isLoading, isError } = useCategoryList(page + 1, rowsPerPage,true); 



  const handleEditCategory = (category: CategoryDataProps) => {
    changeMode("isEdit", true);
    setSelectedCategory(category);
  };

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
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {CategoryTableColumns.map((column) => (
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={CategoryTableColumns.length} align="center">
                  <Box display="flex" justifyContent="center" py={3}>
                    <Loader />
                  </Box>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={CategoryTableColumns.length} align="center">
                  <Box color="red" fontWeight="bold">
                    <NoDataAvailable/>
                  </Box>
                </TableCell>
              </TableRow>
            ) : categories?.data?.length > 0 ? (
              categories.data.map((category: CategoryDataProps) => (
                <TableRow key={category.id}>
                  <TableCell>{category?.id || "---"}</TableCell>
                  <TableCell>{category?.name || "---"}</TableCell>
                  <TableCell>{category?.categoryCount || 0}</TableCell>
                  <TableCell>{category?.status || "---"}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="warning" onClick={() => handleEditCategory(category)}>
                      <EditOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
              <TableCell colSpan={CategoryTableColumns.length} align="center">
                <NoDataAvailable />
              </TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[]} 
        component="div"
        count={categories?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default CategoryTable;