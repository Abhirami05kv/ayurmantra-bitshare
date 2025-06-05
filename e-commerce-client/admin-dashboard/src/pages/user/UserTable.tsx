import { 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from '@mui/material';
import { UserTableColumns } from '../../constants/UserTableColumns';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useUserList from "../../hooks/useUserList";
import { Loader } from "../../components/Loader";
import NoDataAvailable from "../../components/NodataAvailable";

interface UserTableProps {
  changeMode: (key: keyof DrawerModeProps, status: boolean) => void;
  setSelectedUser: (user: any) => void;
}

function UserTable({ changeMode, setSelectedUser }: UserTableProps) {
  const { data: users = [], isLoading, isError } = useUserList();

  const handleEditUser = (user: any) => {
    changeMode("isEdit", true);
    setSelectedUser(user);
  };
console.log(users);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {UserTableColumns.map((column) => (
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
            {/* Show Loader when Loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={UserTableColumns.length} align="center">
                  <Loader />
                </TableCell>
              </TableRow>
            )}

            {/* Show Error Message when Error Occurs */}
            {isError && (
              <TableRow>
                <TableCell colSpan={UserTableColumns.length} align="center">
                  <Typography color="error">
                    <NoDataAvailable />
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Show Users Data */}
            {!isLoading && !isError && users?.data.length > 0
              ? users?.data?.map((user: any) => (
                  <TableRow key={user?.id} hover>
                    <TableCell>{user?.id || "--"}</TableCell>
                    <TableCell>{user?.name || "--"}</TableCell>
                    <TableCell>{user?.email || "--"}</TableCell>
                    <TableCell>{user?.phoneNumber || "--"}</TableCell>
                    <TableCell>{user?.role || "--"}</TableCell>
                    <TableCell>
                      {user?.is_active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleEditUser(user)}
                      >
                        <EditOutlinedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : !isLoading &&
                !isError && (
                  <TableRow>
                    <TableCell colSpan={UserTableColumns.length} align="center">
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

export default UserTable;
