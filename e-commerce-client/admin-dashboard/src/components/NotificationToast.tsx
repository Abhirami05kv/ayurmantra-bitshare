import { Snackbar, Alert, AlertColor } from "@mui/material";

interface NotificationToastProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

export const NotificationToast = ({
  open,
  message,
  severity,
  onClose,
}: NotificationToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};