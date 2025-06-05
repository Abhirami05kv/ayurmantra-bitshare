import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { GiftcardTableColumns } from "../../constants/GiftcardTableColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Loader } from "../../components/Loader";
import NoDataAvailable from "../../components/NodataAvailable";
import { useGiftcardList } from "../../hooks/useGiftcardList";
interface GiftCardTableProps {
  changeMode: (key: keyof DrawerModeProps, status: boolean) => void;
  setSelectedGiftCard:(giftcard:GiftCard)=>void
}
function GiftcardTable({ changeMode ,setSelectedGiftCard}: GiftCardTableProps) {
  const { data: giftcards, isLoading, isError } = useGiftcardList();
  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  const handleEditCard = (card:GiftCard) => {
    changeMode("isEdit", true);
    setSelectedGiftCard(card)
  };

  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {GiftcardTableColumns.map((column) => (
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
                <TableCell colSpan={GiftcardTableColumns.length} align="center">
                  <Box display="flex" justifyContent="center" py={3}>
                    <Loader />
                  </Box>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={GiftcardTableColumns.length} align="center">
                  <Typography color="error" fontWeight="bold">
                    <NoDataAvailable />
                  </Typography>
                </TableCell>
              </TableRow>
            ) : giftcards?.data.length > 0 ? (
              giftcards?.data.map((card: any) => (
                <TableRow key={card.id} >
                  <TableCell>{card?.id || "---"}</TableCell>
                  <TableCell>{card?.title || "---"}</TableCell>
                  <TableCell>{card?.purchaseAmount || "--"}</TableCell>
                  <TableCell>{card?.usableAmount || "---"}</TableCell>
                  <TableCell>
                    {card?.image ? (
                      <img
                        src={`${IMAGE_BASE_URL}${card?.image}`}
                        alt={card.title}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      "---"
                    )}
                  </TableCell>
                  <TableCell>{card?.status || "--"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={()=>handleEditCard(card)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={GiftcardTableColumns.length} align="center">
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

export default GiftcardTable;
